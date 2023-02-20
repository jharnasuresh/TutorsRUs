//libraries
const express = require("express");
const { db } = require('./firebase.js')
//const toSendToken = require('./tokenSender.js');
const app = express();
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const bcrypt = require("bcrypt") //packate bcrypt imported
const PORT = process.env.PORT || 3001;
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const admin = require("firebase-admin");
const crypto = require('crypto');
console.log("library imports work");
//const users = [] //temporarily storing in array
app.use(express.urlencoded({extended:false}))

const cors = require('cors')
app.use(cors())

app.post('/signup', async (req, res) => {
    console.log("sign up: email = " + req.body["email"])
    var username = req.body.user;
    var useremail = req.body.email;
    var userpassword = String(req.body.pass);

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
    if (!userpassword.includes("#") && userpassword.includes("$") && userpassword.includes("+") && userpassword.includes("%") && userpassword.includes("@")) {
        return res.send(JSON.stringify("requirements"))
    }
    if (!(/\d/.test(userpassword))) {
        return res.send(JSON.stringify("requirements"))
    }
    if (!(/[A-Z]/.test(userpassword))) {
        return res.send(JSON.stringify("requirements"))
    }

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
        sendToken();
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

app.post("/login", async (req, res) => {
    console.log("user: " + req.body["username"])

    const login = await db.collection('users').where('username', '==', req.body["username"]).where('password', '==', md5(req.body["pass"])).get();
    if (!login.empty) {
        var doc = login.docs[0];
       console.log("a " + doc.get("password"))
       return res.send(JSON.stringify("success"))
       //it works!
        
    }
    else {
        console.log("error")
        // not in databse, send error
    }
    //console.log("none " + md5(req.body["pass"]) + " " + )
    return res.send(JSON.stringify("error"))
})


function sendToken () {

console.log("send token entered");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: secure_configuration.EMAIL_USERNAME,
        pass: secure_configuration.PASSWORD
    }
});
  
const token = jwt.sign({
        data: 'Token Data'  ,
    }, 'ourSecretKey', { expiresIn: '10m' }  
);    
  
const mailConfigurations = {
  
    // It should be a string of sender/server email
    from: 'no-reply@gmail.com',
  
    to: req.body.email,
  
    // Subject of Email
    subject: 'Email Verification',
      
    // This would be the text of email body
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:3000/verify/${token} 
           Thanks`
      
};
  
transporter.sendMail(mailConfigurations, function(error, info){
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(info);
});
}

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}