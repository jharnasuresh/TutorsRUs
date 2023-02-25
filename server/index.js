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
const nodemailer = require('nodemailer');
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
        console.log("Jharna i'm in verify");
        //var user = FirebaseAuth.instance.currentUser;

        /*
        if (userRecord.isEmailVerified == false) {
            console.log("verify email");
        }
        else {
            console.log("Jharna email is already verified");
            console.log(userRecord.email)
        }

        //router.post('/', async (req,res) => {
            console.log("june look" + req.body.email)
            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tutorsrus62@gmail.com',
                pass: 'suP3rTut0r$'
            }
            });
        
            var mailOptions = {
            from: 'tutorsrus62@gmail.com',
            to: req.body.email,
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
            };
        
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.send(error)
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send("Success")
            }
            })
        //});
        
        module.exports = router;

          return null;
          */
    /*getAuth()
        .generateEmailVerificationLink(useremail, actionCodeSettings)
            .then((link) => {
                // Construct email verification template, embed the link and send
                // using custom SMTP server.
        return sendCustomVerificationEmail(useremail, displayName, link);
    })
    .catch((error) => {
    // Some error occurred.
     });*/

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

//app.post("/delete")

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




function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}