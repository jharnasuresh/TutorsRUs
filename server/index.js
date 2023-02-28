//libraries
const { getAuth, sendSignInLinkToEmail }  = require('firebase/auth');

const {linkWithCredential, EmailAuthProvider } = require ("firebase/auth");
const {reauthenticateWithCredential} = require ("firebase/auth");
const toVerify = new Boolean(true);
const express = require("express");
const app = express();
//app.use(express.json);
app.use(express.urlencoded({extended:false}));
const admin = require("firebase-admin");

const { db } = require('./firebase.js')
//const toSendToken = require('./tokenSender.js');
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const bcrypt = require("bcrypt") //packate bcrypt imported
const PORT = process.env.PORT || 3001;
require('dotenv').config();

const nodemailer = require('nodemailer');
//let transport = nodemailer.createTransport(options[, defaults])
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
console.log("library imports work");
//const users = [] //temporarily storing in array

const cors = require('cors')
app.use(cors())


app.post('/signup', async (req, res) => {
    var username = req.body.user;
    var useremail = req.body.email;
    var userpassword = String(req.body.pass);
    var answer1 = "";
    var answer2 = "";
    var answer3 = "";
    const user = {
        email:req.body.email,
        password: req.body
    }

    var emailTaken = await db.collection('users').where('email', '==', req.body["email"]).get()
    var userTaken = await db.collection('users').where('username', '==', req.body["user"]).get()

    if (!emailTaken.empty) {
        //email is already taken
        return res.send(JSON.stringify("email is taken"))
    }
    if (!userTaken.empty) {
        //email is already taken
        return res.send(JSON.stringify("username is taken"))
    }
    
    if (userpassword.length <= 8) {
        return res.send(JSON.stringify("not long enough"))
    }
    if (!(/[!#$+%@]/.test(userpassword))) {
        return res.send(JSON.stringify("requirements"))
    }
    if (!(/\d/.test(userpassword))) {
        return res.send(JSON.stringify("requirements"))
    }
    if (!(/[A-Z]/.test(userpassword))) {
        return res.send(JSON.stringify("requirements"))
    }
    
    //any verifications you would like to do
    const userResponse = admin.auth().createUser({ //Create user in authentication section of firebase
       email: useremail, //user email from request body
       emailVerified: false, //user email from request body
       password: md5(userpassword), //hashed user password
       displayName: username, //user name from request body
       disabled: false,
       answer1: "",
       answer2: "",
       answer3: ""
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
          username : req.body["user"],
          answer1 : "",
          answer2: "",
          answer3: "",
          active: true
        };

        var setDoc = db.collection('users').add(data);
        var userIDHash = md5(userRecord.uid);
        //adding hashed userid and userid to Email-Verifications collection
        console.log("Jharna i'm in verify");
        let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: 'tutorsrus62@gmail.com',
              pass: 'cshikqpjzgbcwejb'
            }
         });
        
         const mailOptions = {
            from: 'tutorsrus62@gmail.com', // Sender address
            to: req.body.email, // List of recipients
            subject: 'Welcome To TutorsRUs', // Subject line
            text: 'Pleases click on the verification link', // Plain text body
        };
        
        transport.sendMail(mailOptions, function(err, info) {
           if (err) {
             console.log(err)
           } else {
             console.log(info);
           }
        });
        
          
       })

       

       .catch(function(error) {
          console.log("Error creating new user:", error);
       });
       return res.send(JSON.stringify({username}))

    });




app.get("/api", (req, res) => {
    res.json({ message: "ur mom" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//app.post("/delete")

app.post("/info", async (req, res) => {
    console.log("iii " + req.body["username"])
    const login = await db.collection('users').where('username', '==', req.body["username"]).get();
    if (login.empty) {
        return res.send("error")
    }
    var doc = login.docs[0];


    console.log("aaa " + doc.get("active"))
    
    return res.send(JSON.stringify({"u": req.body["username"], "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": doc.get("active")}))

})

app.post("/delete", async (req, res) => {
    const login = await db.collection('users').where('username', '==', req.body["username"]).get();
    var doc = login.docs[0];
    doc.ref.delete();
    
    return res.send(JSON.stringify("success"))

})

app.post("/deactivate", async (req, res) => {
    const login = await db.collection('users').where('username', '==', req.body["username"]).get();
    var doc = login.docs[0];
    doc.ref.update({active: !doc.get("active")})
    console.log("a? " + doc.get("active"))
    
    return res.send(JSON.stringify("success"))

})



app.post("/update", async (req, res) => {
    var u = req.body.oldU
    const login = await db.collection('users').where('username', '==', req.body.oldU).get();
    var doc = login.docs[0];
    var fname = doc.get("FName")
    var lname = doc.get("LName")
    var email = doc.get("email")
    var user = doc.get("username")
    var pass = doc.get("password")
    var active = doc.get("active")
    if (req.body.fname != "" && req.body.fname !== fname) {
        await doc.ref.update({FName: req.body.fname});
    }
    if (req.body.lname != "" && req.body.lname !== lname) {
        await doc.ref.update({LName: req.body.lname});
    }
    if (req.body.user != "" && req.body.user !== user) {
        user = req.body.user
        await doc.ref.update({username: req.body.user});
    }
    if (req.body.email != "" && req.body.email !== email) {
        await doc.ref.update({email: req.body.email});
    }
    if (req.body.pass != "" && md5(req.body.pass) !== pass) {
        await doc.ref.update({password: md5(req.body.pass)});
    }

    const up = await db.collection('users').where('username', '==', user).get();
    doc = up.docs[0];
    return res.send(JSON.stringify({"u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": active}))

})

app.post("/login", async (req, res) => {
    console.log("user: " + req.body["username"])

    const login = await db.collection('users').where('username', '==', req.body["username"]).where('password', '==', md5(req.body["pass"])).get();
    if (!login.empty) {
        var doc = login.docs[0];
       console.log("a " + doc.get("password"))
       return res.send(JSON.stringify({"u": req.body["username"], "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email")}))
       //it works!
        
    }
    else {
        console.log("error")
        // not in databse, send error
    }
    //console.log("none " + md5(req.body["pass"]) + " " + )
    return res.send(JSON.stringify("error"))
})

app.post("/passsecurity", async(req, res) => {
    console.log("got in passsecurity");
    var u = req.body.oldU
    console.log("first problem area " + u);
    const passsec = await db.collection('users').where('username', '==', req.body.oldU).get();
    console.log("the problem")
    var doc = passsec.docs[0];
    var user = doc.get("username")
    var answer1 = doc.get("answer1")
    var answer2 = doc.get("answer2")
    var answer3 = doc.get("answer3")

    console.log(req.body.question1 + " " + req.body.question2 + " " + req.body.question3)
    if (req.body.question1 !== answer1) {
        await doc.ref.update({answer1: req.body.question1});
    }
    if (req.body.question2 !== answer2) {
        await doc.ref.update({answer2: req.body.question2});
    }
    if (req.body.question3 !== answer3) {
        await doc.ref.update({answer3: req.body.question3});
    }
    const up = await db.collection('users').where('username', '==', user).get();
    doc = up.docs[0];
    return res.send(JSON.stringify({"u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "answer1": doc.get("question1"), "answer2": doc.get("question2"), "answer3": doc.get("question3")}))

});



function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}