//libraries



const { getAuth, sendSignInLinkToEmail, sendEmailVerification } = require('firebase/auth');

const { linkWithCredential, EmailAuthProvider } = require("firebase/auth");
const { reauthenticateWithCredential } = require("firebase/auth");
const toVerify = new Boolean(true);
const express = require("express");
const app = express();
//app.use(express.json);
app.use(express.urlencoded({ extended: false }));
const admin = require("firebase-admin");

const { db } = require('./firebase.js')
//const toSendToken = require('./tokenSender.js');
const bp = require('body-parser')
app.use(bp.json({limit: '50mb'}));
app.use(bp.urlencoded({limit: '50mb', extended: true}));
const bcrypt = require("bcrypt") //packate bcrypt imported
const PORT = process.env.PORT || 3001;
require('dotenv').config();

const nodemailer = require('nodemailer');
//let transport = nodemailer.createTransport(options[, defaults])
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const FormData = require('form-data');
const multer = require('multer')
console.log("library imports work");
//const users = [] //temporarily storing in array

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration




app.post('/signup', async (req, res) => {
    var username = req.body.user;
    var useremail = req.body.email;
    var userpassword = String(req.body.pass);
    var answer1 = "";
    var answer2 = "";
    var answer3 = "";
    var userUniqueString = "";
    var active = false;
    var lang = "";
    var profpic = "";
    var taking = {};
    var taken = {};
    var price = 0;
    const user = {
        email: req.body.email,
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

    const uniqueString = randString()

    //any verifications you would like to do
    const userResponse = admin.auth().createUser({ //Create user in authentication section of firebase
        email: useremail, //user email from request body
        emailVerified: false, //user email from request body
        password: md5(userpassword), //hashed user password
        displayName: username, //user name from request body
        disabled: false,
        answer1: "",
        answer2: "",
        answer3: "",
        active: true,
        userUniqueString: uniqueString,
        followers: [],
        following: [],
        lang: "",
        profpic: "",
        taking: {},
        taken: {},
        price: 0
    })
        .then(function (userRecord) {
            console.log("Successfully created new user:", userRecord.uid);
            //add data to database
            var data = {
                //Whatever data you would like to add for this user
                email: req.body["email"],
                password: md5(req.body["pass"]),
                FName: req.body["firstName"],
                LName: req.body["lastName"],
                username: req.body["user"],
                answer1: "",
                answer2: "",
                answer3: "",
                active: true,
                userUniqueString: uniqueString,
                followers: [],
                following: [],
                lang: "",
                profpic: "",
                taking: {},
                taken: {},
                price: 0
            };

            var setDoc = db.collection('users').add(data);
            var userIDHash = md5(userRecord.uid);
            //adding hashed userid and userid to Email-Verifications collection
            console.log("Jharna i'm in verify");


            console.log("junie pie this is the email: " + req.body.email)

            const { email } = req.body.email
            sendVerificationMail(req.body.username, req.body.email, uniqueString, `Your verification code is ` + uniqueString)
            console.log("june papi " + uniqueString)

            /*const { email } = req.body.email
            const uniqueString = randString()
            const isValid = false
            sendMail(email, uniqueString)
            res.redirect('back')*/



        })



        .catch(function (error) {
            console.log("Error creating new user:", error);
        });
    return res.send(JSON.stringify({ username, uniqueString }))

});


app.post("/verify", async (req, res) => {
    console.log("jharna im in verify post function in index.js")
    var u = req.body.oldU
    console.log("first problem area " + u);
    const passsec = await db.collection('users').where('username', '==', req.body.oldU).get();
    console.log("the problem")
    var doc = passsec.docs[0];
    var user = doc.get("username")
    console.log("look this is the user " + user)
    var answer1 = doc.get("answer1")
    var answer2 = doc.get("answer2")
    var answer3 = doc.get("answer3")
    var uniqueString = doc.get("userUniqueString")
    console.log("this is the string" + uniqueString)
    console.log("this is what jharna typed: " + req.body["userUniqueString"])
    if (uniqueString === req.body["userUniqueString"]) {
        console.log("they equal the same thing")
    }
    else {
        return res.send(JSON.stringify("invalid code"))
    }
    const up = await db.collection('users').where('username', '==', user).get();
    doc = up.docs[0];
    return res.send(JSON.stringify({ "u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "answer1": doc.get("question1"), "answer2": doc.get("question2"), "answer3": doc.get("question3"), "userUniqueString": doc.get("userUniqueString") }))

})

app.get("/api", (req, res) => {
    res.json({ message: "ur mom" });
});

const upload = multer();
app.post("/parse", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const {
        file,
        body: { user }
    } = req;

    var login = await db.collection('users').where('username', '==', req.body.user).get();
    if (!login.empty) {
        var doc = login.docs[0];
        await doc.ref.update({ transcript: req.file })
        await doc.ref.update({ tutor: true })

        login = await db.collection('users').where('username', '==', req.body.user).get();
        doc = login.docs[0];
        console.log("tutor now " + doc.get("tutor"))
        return res.send(JSON.stringify({ "u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": doc.get("active"), "userUniqueString": doc.get("userUniqueString"), "followers": doc.get("followers"), "following": doc.get("following"), "lang": doc.get("lang"), taking: doc.get("taking"), tutor: doc.get("tutor"), price: doc.get("price"), taken: doc.get("taken") }))

    }
    else {
        return res.send(JSON.stringify("error"))
    }


});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.post("/searchcoursetitle", async (req, res) => {

    const list = await db.collection('users').where('taken', 'array-contains', req.body["course"]).get();
    console.log(list.size)
    users = {};
    for (user in list.docs) {
        users[user.get("username")] = {rating: user.get("rating"), price: user.get("price"), taken: user.get("taken"), fName: user.get("FName"), lName: user.get("LName")}
        
    }
    return res.send(JSON.stringify(users))


});

app.post("/searchmultiplecourses", async (req, res) => {

    var list = await db.collection('users').where('taken', 'array-contains', req.body["courses"][0]).get();;
    for (course in req.body["courses"]) {
        const list2 = await db.collection('users').where('taken', 'array-contains', course).get();
        list = list.filter(value => list2.includes(value))
    }

    console.log(list.size)
    users = {};
    for (user in list.docs) {
        users[user.get("username")] = {rating: user.get("rating"), price: user.get("price"), taken: user.get("taken"), fName: user.get("FName"), lName: user.get("LName")}
        
    }
    return res.send(JSON.stringify(users))


});

app.post("/info", async (req, res) => {
    console.log("iii " + req.body["username"])
    const login = await db.collection('users').where('username', '==', req.body["username"]).get();
    if (login.empty) {
        return res.send("error")
    }
    var doc = login.docs[0];


    console.log("aaa " + doc.get("active"))
    console.log("look here are your followers: " + doc.get("followers"))

    return res.send(JSON.stringify({ "u": req.body["username"], "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": doc.get("active"), "userUniqueString": doc.get("userUniqueString"), "followers": doc.get("followers"), "following": doc.get("following"), "lang": doc.get("lang"), "profpic": doc.get("profpic"), taking: doc.get("taking"), taken: doc.get("taken"), tutor: doc.get("tutor"), price: doc.get("price") }))


})

app.post("/deltranscript", async (req, res) => {
    var login = await db.collection('users').where('username', '==', req.body["username"]).get();
    if (!login.empty) {
        var doc = login.docs[0]
        await doc.ref.update({ transcript: null });
        await doc.ref.update({ tutor: false });
        login = await db.collection('users').where('username', '==', req.body["username"]).get();
        doc = login.docs[0]
        console.log("no longer tutor " + doc.get("tutor"))
        return res.send(JSON.stringify({ "u": req.body["username"], "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": doc.get("active"), "userUniqueString": doc.get("userUniqueString"), "followers": doc.get("followers"), "following": doc.get("following"), "lang": doc.get("lang"), "profpic":doc.get("profpic"), taking: doc.get("taking"), tutor: doc.get("tutor"), price: doc.get("price"), taken: doc.get("taken") }))


    }
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
    doc.ref.update({ active: !doc.get("active") })
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
    var lang = doc.get("lang")
    var price = doc.get("price")
    if (req.body.fname != "" && req.body.fname !== fname) {
        await doc.ref.update({ FName: req.body.fname });
    }
    if (req.body.lname != "" && req.body.lname !== lname) {
        await doc.ref.update({ LName: req.body.lname });
    }
    if (req.body.user != "" && req.body.user !== user) {
        user = req.body.user
        await doc.ref.update({ username: req.body.user });
    }
    if (req.body.email != "" && req.body.email !== email) {
        await doc.ref.update({ email: req.body.email });
    }
    if (req.body.pass != "" && md5(req.body.pass) !== pass) {
        await doc.ref.update({ password: md5(req.body.pass) });
    }
    if (req.body.lang != "" && req.body.lang !== lang) {
        await doc.ref.update({ lang: req.body.lang });
    }
    if (req.body.price != "" && Number(req.body.price) != price) {
        await doc.ref.update({ price: Number(req.body.price) });
    }

    const up = await db.collection('users').where('username', '==', user).get();
    doc = up.docs[0];
    return res.send(JSON.stringify({ "u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": active, "lang": doc.get("lang"), "profpic": doc.get("profpic"), "taking": doc.get("taking"), "followers": doc.get("followers"), "following": doc.get("following"), "price": doc.get("price"), "taken": doc.get("taken") }))


})

app.post("/login", async (req, res) => {
    console.log("user: " + req.body["username"])

    const login = await db.collection('users').where('username', '==', req.body["username"]).where('password', '==', md5(req.body["pass"])).get();
    if (!login.empty) {
        var doc = login.docs[0];
        console.log("a " + doc.get("password"))
        return res.send(JSON.stringify({ "u": req.body["username"], "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email") }))
        //it works!

    }
    else {
        console.log("error")
        // not in databse, send error
    }
    //console.log("none " + md5(req.body["pass"]) + " " + )
    return res.send(JSON.stringify("error"))
})

app.post("/addcourse", async (req, res) => {

    const login = await db.collection('users').where('username', '==', req.body.u).get();
    var doc = login.docs[0];
    
    c = doc.get("taking")

    info = {"title": req.body.title, "professor": req.body.prof, "semester": req.body.semester}

    // USE THIS WHEN SEARCHING TOO
    var t = JSON.stringify(req.body.title).toLowerCase();
    t = JSON.parse(t.replace(/\s+/g, ''));
    
    c[t] = info

    await doc.ref.update({ taking: c })
    return res.send(JSON.stringify({ "taking": c }))


})

app.post("/deletecourse", async (req, res) => {

    const login = await db.collection('users').where('username', '==', req.body["u"]).get();
    var doc = login.docs[0];
    
    c = doc.get("taking")

    // USE THIS WHEN SEARCHING TOO
    var t = JSON.stringify(req.body.title).toLowerCase();
    t = JSON.parse(t.replace(/\s+/g, ''));

    if (!Object.keys(c).includes(t)) {
        //course not in list
        console.log("here")
        return res.send(JSON.stringify({ "taking": c }))
    }

    

    delete c[t]
    await doc.ref.update({ taking: c })
    return res.send(JSON.stringify({ "taking": c }))

})

app.post("/addcoursetutor", async (req, res) => {

    const login = await db.collection('users').where('username', '==', req.body.u).get();
    var doc = login.docs[0];
    
    c = doc.get("taken")

    var t = JSON.stringify(req.body.title).toLowerCase();
    t = JSON.parse(t.replace(/\s+/g, ''));

    info = {"title": req.body.title, "professor": req.body.prof, "semester": req.body.semester, "grade": req.body.grade}
    c[t] = info

    await doc.ref.update({ taken: c })
    return res.send(JSON.stringify({ "taken": c }))


})

app.post("/deletecoursetutor", async (req, res) => {

    const login = await db.collection('users').where('username', '==', req.body["u"]).get();
    var doc = login.docs[0];
    
    c = doc.get("taken")

    var t = JSON.stringify(req.body.title).toLowerCase();
    t = JSON.parse(t.replace(/\s+/g, ''));

    if (!Object.keys(c).includes(t)) {
        //course not in list
        console.log("here")
        return res.send(JSON.stringify({ "taken": c }))
    }

    delete c[t]
    await doc.ref.update({ taken: c })
    return res.send(JSON.stringify({ "taken": c }))

})

app.post("/passsecurity", async (req, res) => {
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
    var uniqueString = doc.get("userUniqueString")

    console.log(req.body.question1 + " " + req.body.question2 + " " + req.body.question3)
    if (req.body.question1 !== answer1) {
        await doc.ref.update({ answer1: req.body.question1 });
    }
    if (req.body.question2 !== answer2) {
        await doc.ref.update({ answer2: req.body.question2 });
    }
    if (req.body.question3 !== answer3) {
        await doc.ref.update({ answer3: req.body.question3 });
    }
    const up = await db.collection('users').where('username', '==', user).get();
    doc = up.docs[0];
    return res.send(JSON.stringify({ "u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "answer1": doc.get("question1"), "answer2": doc.get("question2"), "answer3": doc.get("question3"), "userUniqueString": doc.get("userUniqueString") }))

});

const verifyUser = (req, res, next) => {
    console.log("hi jharna suresh")
}

app.get("localhost:3000/confirmationCode", verifyUser)





app.post("/resetpass", async (req, res) => {
    console.log("jharna i made it in the reset post")
    console.log("j look")
    const passsec = await db.collection('users').where('email', '==', req.body.email).get();

    var doc = passsec.docs[0];

    var user = doc.get("username")
    var answer1 = doc.get("answer1")
    var answer2 = doc.get("answer2")
    var answer3 = doc.get("answer3")
    console.log("answer1: " + answer1 + " reqanswer: " + req.body.answer1)
    console.log("answer2: " + answer2 + " reqanswer: " + req.body.answer2)
    console.log("answer3: " + answer3 + " reqanswer: " + req.body.answer3)
    if (answer1 === req.body["answer1"] || answer2 === req.body["answer2"] || answer3 === req.body["answer3"]) {
        console.log("june look it worked")
        sendVerificationMail(user, doc.get("email"), doc.get("userUniqueString"), "resetpass")

        /*user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
                   return;
                }
               res.send({
                   message:
                     "User was registered successfully! Please check your email",
                });
       
              nodemailer.sendConfirmationEmail(req.body.email, uniqueString);
       });*/

    }
    else {
        return res.send(JSON.stringify("error"))
    }
    console.log("this is the username " + user)
    return res.send(JSON.stringify({ "u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "answer1": doc.get("question1"), "answer2": doc.get("question2"), "answer3": doc.get("question3"), "userUniqueString": doc.get("userUniqueString") }))


})



app.post("/securepassreset", async (req, res) => {
    console.log("got in securepassreset");
    var u = req.body.username
    console.log("first potential problem area " + u);
    const passsec = await db.collection('users').where('username', '==', req.body.username).get();
    console.log("no problem here!")
    var doc = passsec.docs[0];
    var user = doc.get("username")

    console.log(req.body.username + " " + req.body["password"] + " " + req.body["confirmPassword"])
    if (req.body["password"] != req.body["confirmPassword"]) {
        return res.send(JSON.stringify("passwords don't match"))
    }
    if (req.body["password"] === req.body["confirmPassword"]) {
        await doc.ref.update({ password: md5(req.body.password) });
    }
    const up = await db.collection('users').where('username', '==', user).get();
    doc = up.docs[0];
    return res.send(JSON.stringify({ "username": req.body["username"], "password": req.body["password"] }))

});


app.post("/notyourprofile", async (req, res) => {
    console.log("in back end of NYP")
    var currUser = req.body["currUser"]
    console.log("first potential problem area " + currUser);
    const currentUserData = await db.collection('users').where('username', '==', currUser).get();
    console.log("no problem here!")
    var currentUserDataDoc = currentUserData.docs[0];
    var followers = currentUserDataDoc.get("followers")
    var currentUsername = currentUserDataDoc.get("username")


    var oldUser = req.body["oldUser"]
    console.log("first potential problem area " + oldUser);
    const oldUserData = await db.collection('users').where('username', '==', oldUser).get();
    console.log("no problem here!")
    var oldUserDataDoc = oldUserData.docs[0];
    var following = oldUserDataDoc.get("following")
    var oldUsername = oldUserDataDoc.get("username")
    var oldfname = oldUserDataDoc.get("FName")
    var oldlname = oldUserDataDoc.get("LName")
    var oldemail = oldUserDataDoc.get("email")
    var oldfollowers = oldUserDataDoc.get("followers")
    var oldactive = oldUserDataDoc.get("active")
    var oldlang = oldUserDataDoc.get("lang")
    var oldPFP = oldUserDataDoc.get("profpic")
    var oldcourse = oldUserDataDoc.get("taking")



    console.log("the current user is " + currUser + " the old user " + oldUser)
    if (following.includes(currentUsername)) {
        console.log("we are unfollowing right now")
        var ind = following.indexOf(currentUsername)
        following.splice(ind, 1)
        ind = followers.indexOf(oldUsername)
        followers.splice(ind, 1)
    }
    else {
        console.log("we are following right now")
        following.push(currUser)
        followers.push(oldUser)
    }


    await currentUserDataDoc.ref.update({ followers: followers });
    await oldUserDataDoc.ref.update({ following: following });

    const upCurr = await db.collection('users').where('username', '==', currUser).get();
    currentUserDataDoc = upCurr.docs[0];

    const upOld = await db.collection('users').where('username', '==', oldUser).get();
    oldUserDataDoc = upOld.docs[0];
   return res.send(JSON.stringify({ "newFollowers": followers, "newFollowing": following, "u": oldUser, "fname": oldfname, "lname": oldlname, "email": oldemail, "followers": oldfollowers, "active": oldactive, "lang": oldlang, "taking": oldcourse, price:  currentUserDataDoc.get("price"), "profpic": oldPFP})) // idk if this is the right price


});


app.post("/pfpupload", async (req, res) => {
    console.log("got in profile picture upload");
    var u = req.body.username
    console.log("1");
    const passsec = await db.collection('users').where('username', '==', req.body.username).get();
    console.log("2")
    var doc = passsec.docs[0];
    console.log("2")
    var user = doc.get("username")
    console.log("2")
    if (req.body["pfpurl"] != doc.get["profpic"]) {
        await doc.ref.update({ profpic: req.body["pfpurl"] });
        console.log("3")
    }
    

    /*
     * Step 1: New PFP variable
     * Step 2: Store link in PFP var in database
     * Step 3: Retrieve link from database
     */
    console.log("4")
    const up = await db.collection('users').where('username', '==', user).get();
    console.log("5")
    doc = up.docs[0];
    console.log("6")
    return res.send(JSON.stringify({ "u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "answer1": doc.get("question1"), "answer2": doc.get("question2"), "answer3": doc.get("question3"), "userUniqueString": doc.get("userUniqueString") }))

});

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

const randString = () => {

    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }
    return token
}


const sendVerificationMail = (username, email, uniqueString, whichService) => {
    console.log("in send mail")

    console.log("uniqueString: " + uniqueString)
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'tutorsrus62@gmail.com',
            pass: 'cshikqpjzgbcwejb'
        }
    });

    var verify = true
    if (whichService === "resetpass") {
        verify = false
    }
    var mailOptions;
    if (whichService != "resetpass") {
        mailOptions = {
            from: 'tutorsrus62@gmail.com', // Sender address
            to: email, // List of recipients
            subject: 'Welcome To TutorsRUs', // Subject line
            html: 'Your verification code is ' + uniqueString
        };
    }
    else {
        mailOptions = {
            from: 'tutorsrus62@gmail.com', // Sender address
            to: email, // List of recipients
            subject: 'Username/Password Reset', // Subject line
            html: `<h1>CONFIDENTIAL</h1>
            <p> Your username is: ${username} </p>
            <p>Click this link to reset your password</p>
            <a href=http://localhost:3000/SecurePassReset> Click here</a>
            </div>`
        };
    }


    transport.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}



