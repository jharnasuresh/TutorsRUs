//libraries
const express = require("express");
const { db } = require('./firebase.js')

const app = express();
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const bcrypt = require("bcrypt") //packate bcrypt imported
const PORT = process.env.PORT || 3001;
//const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const crypto = require('crypto');
console.log("library imports work");
const users = [] //temporarily storing in array
app.use(express.urlencoded({extended:false}))

const cors = require('cors')
app.use(cors())

app.post("/register", async (req, res) => {
    try {
        console.log("start try: pass = " + req.body.pass);

        //const hashedPassword = await bcrypt.hash(pass)
        /*users.push({
            id: Date.now().toString(),
            name : req.body.firstName,
            //email:req.body.email,
            password: hashedPassword
        })
        */



        console.log("end try");
        console.log(users);
        res.redirect("/login")
    } catch (e) {
        console.log(e);
        res.redirect("/register");
    }
})

app.post('/signup', (req, res) => {
    console.log("sign up: email = " + req.body["email"])
    var username = req.body.user;
    var useremail = req.body.email;
    var userpassword = String(req.body.pass);
    //any verifications you would like to do
    admin.auth().createUser({ //Create user in authentication section of firebase
       email: useremail, //user email from request body
       emailVerified: false, //user email from request body
       password: md5(userpassword), //hashed user password
       displayName: username, //user name from request body
       disabled: false
       })
        .then(function(userRecord) {
        console.log("Successfully created new user:", userRecord.uid);
        //add data to database
        var data = {
          //Whatever data you would like to add for this user
          email : req.body["email"],
          password: md5(req.body["pass"]),
          FName : req.body["firstName"],
          LName : req.body["lastName"],
          username : req.body["user"]
        };

        var setDoc = db.collection('users').add(data);
        var userIDHash = md5(userRecord.uid);
        //adding hashed userid and userid to Email-Verifications collection
        
       
       })
       .catch(function(error) {
          console.log("Error creating new user:", error);
       });
       return res.send(JSON.stringify(username));
    });




app.get("/api", (req, res) => {
    res.json({ message: "ur mom" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.post("/verifyemail", function (req, res) {
    //res.render("profile.html");
    var email = req.body.email;
    var pass = req.body.pass;
    var FName = req.body.FName;
    var LName = req.body.LName;
    var username = req.body.user;
    console.log("slay")
    db.ref("customPath").set(obj, function(error) {
        if (error) {
          // The write failed...
          console.log("Failed with error: " + error)
        } else {
          // The write was successful...
          console.log("success")
        }
    })
});

app.post("/login", async (req, res) => {
    console.log("user: " + req.body["username"])

    const login = await db.collection('users').where('username', '==', req.body["username"]).where('password', '==', md5(req.body["pass"])).get();
    if (!login.empty) {
        var doc = login.docs[0];
       console.log("a " + doc.get("password"))
       //
        
    }
    else {
        console.log("b")
    }
    //console.log("none " + md5(req.body["pass"]) + " " + )
    return res.send(JSON.stringify("hi"))
})


function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}