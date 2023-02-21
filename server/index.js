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
//--------------------------ADDED FOR VERIFICATION --------------------
const nodemailerSendgrid = require('nodemailer-sendgrid');
const transport = nodemailer.createTransport(
    nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY
    })
);
/*transport
    .sendMail({
        from: 'andris@kreata.ee',
        to: 'Andris Reinman <andris.reinman@gmail.com>, andris@ethereal.email',
        subject: 'hello world',
        html: '<h1>Hello world!</h1>'
    })
    .then(([res]) => {
        console.log('Message delivered with code %s %s', res.statusCode, res.statusMessage);
    })
    .catch(err => {
        console.log('Errors occurred, failed to deliver message');

        if (err.response && err.response.body && err.response.body.errors) {
            err.response.body.errors.forEach(error => console.log('%s: %s', error.field, error.message));
        } else {
            console.log(err);
        }
    });*/
//---------------------------------------------------------------------------

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
console.log("library imports work");
//const users = [] //temporarily storing in array

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
        res.redirect("/verify")
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

        if (userRecord.isEmailVerified == false) {
            console.log("verify email");
        }
        else {
            console.log("Jharna email is already verified");
            console.log(userRecord.email)
        }
        const functions = require('firebase-functions');
        /*const gmailEmail = functions.config().gmail.email;
        const gmailPassword = functions.config().gmail.password;*/
        console.log("1");
        const mailTransport = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            userVar: user.email,
            passVar: user.password,
          },
        });
        console.log("2");
        // Sends an email confirmation when a user changes his mailing list subscription.
        exports.sendEmailConfirmation = functions.database.ref('/users/{uid}').onWrite(async(toVerify) => {
          // Early exit if the 'subscribedToMailingList' field has not changed
          /*if (change.after.child('subscribedToMailingList').val() === change.before.child('subscribedToMailingList').val()) {
            return null;
          }*/
          console.log("3");
          const val = change.after.val();
          console.log("got to mail options");
          const mailOptions = {
            from: '"Spammy Corp." <noreply@firebase.com>',
            to: val.email,
          };
          console.log("4");
          //const subscribed = val.subscribedToMailingList;
        
          // Building Email message.
          mailOptions.subject ='Verification link';
          mailOptions.text = 
              'Click on this link to verify';
          console.log("5");
          try {
            await mailTransport.sendMail(mailOptions);
            functions.logger.log(
              `New verification email sent to:`,
              val.email
            );
            console.log("sent mail june !!!!!!!!");
          } catch(error) {
            functions.logger.error(
              'There was an error while sending the email:',
              error
            );
          }
          return null;
        });
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




function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}