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
const { doc, setDoc } = require("firebase/firestore");
//const toSendToken = require('./tokenSender.js');
const bp = require('body-parser')
app.use(bp.json({ limit: '50mb' }));
app.use(bp.urlencoded({ limit: '50mb', extended: true }));
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

const cors = require("cors");
const { Replay10 } = require('@mui/icons-material');
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}



app.use(cors(corsOptions)) // Use this after the variable declaration

const todos = [];
// Get all todos
app.get("/todos", (req, res) => {
    return res.status(200).json({
        data: todos,
        error: null,
    });
});




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
    var takenTitles = [];
    var takingTitles = [];
    var price = 0;
    var studentRating = 0;
    var tutorRating = 0;
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
        takenTitles: [],
        takingTitles: [],
        takenProfs: [],
        takingProfs: [],
        tutor: false,
        price: 0,
        studentRating: 0,
        tutorRating: 0,
        boards: []
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
                FNameLower: req.body["firstName"].toLowerCase(),
                LNameLower: req.body["lastName"].toLowerCase(),
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
                tutor: false,
                takenTitles: [],
                takingTitles: [],
                takenProfs: [],
                takingProfs: [],
                price: 0,
                studentRating: 0,
                tutorRating: 0,
                boards: []
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

app.post("/upvotepost", async (req, res) => {
    const postData = await db.collection('posts').where('text', '==', req.body.post[0]).get();
    console.log("no problem here!")
    var postDataDoc = postData.docs[0];
    var upvotes = postDataDoc.get("upvotes")



    console.log("the current user is " + req.body.user)
    if (upvotes.includes(req.body.user)) {
        console.log("we already liked");
    }
    else {
        console.log("we are linking right now")
        upvotes.push(req.body.user);
    }


    await postDataDoc.ref.update({ upvotes: upvotes });

    const upCurr = await db.collection('posts').where('text', '==', req.body.post[0]).get();
    postDataDoc = upCurr.docs[0];

    var d = await db.collection('posts').where('board', '==', req.body.board).get();
    var posts = [];
    console.log(d.docs.length)
    for (var i = 0; i < d.docs.length; i++) {
        var data = [d.docs[i].get('text'), d.docs[i].get('user'), d.docs[i].get('link'), d.docs[i].get('anon'), d.docs[i].get('replies'), d.docs[i].get('pdf'), d.docs[i].get('pdfname')]
        posts.push(data);
    }
    return res.send(JSON.stringify({ posts: posts }))

    //return res.send(JSON.stringify({ user: req.body.user }))


});


app.post("/downvotepost", async (req, res) => {
    const postData = await db.collection('posts').where('text', '==', req.body.post[0]).get();
    console.log("no problem here!!")
    var postDataDoc = postData.docs[0];
    var downvotes = postDataDoc.get("downvotes")



    console.log("the current user is " + req.body.user)
    if (downvotes.includes(req.body.user)) {
        console.log("we already liked");
    }
    else {
        console.log("we are linking right now")
        downvotes.push(req.body.user);
    }


    await postDataDoc.ref.update({ downvotes: downvotes });

    const upCurr = await db.collection('posts').where('text', '==', req.body.post[0]).get();
    postDataDoc = upCurr.docs[0];

    var d = await db.collection('posts').where('board', '==', req.body.board).get();
    var posts = [];
    console.log(d.docs.length)
    for (var i = 0; i < d.docs.length; i++) {
        var data = [d.docs[i].get('text'), d.docs[i].get('user'), d.docs[i].get('link'), d.docs[i].get('anon'), d.docs[i].get('replies'), d.docs[i].get('pdf'), d.docs[i].get('pdfname')]
        posts.push(data);
    }
    return res.send(JSON.stringify({ posts: posts }))

    return res.send(JSON.stringify({ user: req.body.user }))


});



app.post("/upvotereply", async (req, res) => {
    const postData = await db.collection('posts').where('text', '==', req.body.post[0]).get();
    console.log("no problem here!!!")
    var postDataDoc = postData.docs[0];

    var replies = postDataDoc.get('replies')

    var temp;
    var count = replies.length
    for (var i = 0; i < replies.length; i++) {
        console.log("here " + replies[i])
        if (replies[i].includes(`${req.body.reply}~${req.body.user}`)) {
            console.log('found')
            temp = replies[i]
            var reptext = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var usern = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var an = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var upv = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var downv = temp
            //var info = [reptext, usern, an, upv, downv]
            upv++;

            replies[i] = `${reptext}~${usern}~${an}~${upv}~${downv}`
            break;
        }
    }

    console.log(replies)

    await postDataDoc.ref.update({replies: replies})
    const upCurr =  await db.collection('posts').where('text', '==', req.body.post[0]).get();

console.log('updated')
    var d = await db.collection('posts').where('board', '==', req.body.board).get();
    var posts = [];
    console.log(d.docs.length)
    for (var i = 0; i < d.docs.length; i++) {
        var data = [d.docs[i].get('text'), d.docs[i].get('user'), d.docs[i].get('link'), d.docs[i].get('anon'), d.docs[i].get('replies'), d.docs[i].get('pdf'), d.docs[i].get('pdfname')]
        posts.push(data);
        console.log("d " + data)
        if (d.docs[i].get('text') === req.body.post[0]) {
            int = i;
        }
    }
    console.log("posts " + posts)
    return res.send(JSON.stringify({ posts: posts, count: count, replies: posts[int] }))

    //return res.send(JSON.stringify({ user: req.body.user }))


});


app.post("/downvotereply", async (req, res) => {
    const postData = await db.collection('posts').where('text', '==', req.body.post[0]).get();
    console.log("no problem here!!!!")
    var postDataDoc = postData.docs[0];

    var replies = postDataDoc.get('replies')

    var temp;
    var count = replies.length;
    for (var i = 0; i < replies.length; i++) {
        if (replies[i].includes(`${req.body.reply}~${req.body.user}`)) {
            console.log('found')
            temp = replies[i]
            var reptext = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var usern = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var an = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var upv = temp.substring(0, temp.indexOf("~"))
            temp = temp.substring(temp.indexOf("~") + 1)
            var downv = temp
            //var info = [reptext, usern, an, upv, downv]
            downv++;

            replies[i] = `${reptext}~${usern}~${an}~${upv}~${downv}`
            break;
        }
    }

    await postDataDoc.ref.update({replies: replies})
    const upCurr =  await db.collection('posts').where('text', '==', req.body.post[0]).get();

    var d = await db.collection('posts').where('board', '==', req.body.board).get();
    var posts = [];
    console.log(d.docs.length)
    var int;
    for (var i = 0; i < d.docs.length; i++) {
        var data = [d.docs[i].get('text'), d.docs[i].get('user'), d.docs[i].get('link'), d.docs[i].get('anon'), d.docs[i].get('replies'), d.docs[i].get('pdf'), d.docs[i].get('pdfname')]
        posts.push(data);
        if (d.docs[i].get('text') === req.body.post[0]) {
            int = i;
        }
    }
    console.log(posts)
    return res.send(JSON.stringify({ posts: posts, count: count, replies: posts[int] }))

    //return res.send(JSON.stringify({ user: req.body.user }))


});




app.post("/deletepost", async (req, res) => {
    /*const postData = await db.collection('posts').where('text', '==', req.body.post[0]).get();
    console.log("no problem here!")
    var postDataDoc = postData.docs[0];
    postDataDoc.deleteDoc();*/
    /* console.log("june look this is the post " + (req.body.post)[0]);
     var postData = await db.collection('posts').where('text', '==', req.body.post[0]).get();
     var doc = postData.docs[0];

     await doc.ref.update({ anon: true });
     var t = await db.collection("posts").doc((req.body.post)[0]).delete();*/
    const postingData = await db.collection('posts').where('text', '==', (req.body.post)[0]).get();
    var postingDataDoc = postingData.docs[0];
    postingDataDoc.ref.delete();

    var d = await db.collection('posts').where('board', '==', req.body.board).get();
    var posts = [];
    console.log(d.docs.length)
    for (var i = 0; i < d.docs.length; i++) {
        var data = [d.docs[i].get('text'), d.docs[i].get('user'), d.docs[i].get('link'), d.docs[i].get('anon'), d.docs[i].get('replies')]
        posts.push(data);
    }
    return res.send(JSON.stringify({ posts: posts }));


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
    const {
        file,
        body: { user }
    } = req;



    var login = await db.collection('users').where('username', '==', req.body.user).get();
    if (!login.empty) {
        const info = {
            username: req.body.user,
            transcript: file
        }

        const r = await db.collection('transcripts').doc(req.body.user).set(info);

        var doc = login.docs[0];
        await doc.ref.update({ tutor: true })
        console.log("2")
        return res.send(JSON.stringify({ "studentRating": doc.get("studentRating"), "tutorRating": doc.get("tutorRating"), "u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": doc.get("active"), "userUniqueString": doc.get("userUniqueString"), "followers": doc.get("followers"), "following": doc.get("following"), "lang": doc.get("lang"), taking: doc.get("taking"), tutor: doc.get("tutor"), price: doc.get("price"), venmo: doc.get("venmo"), taken: doc.get("taken") }))

    }
    return res.send(JSON.stringify("error"))

});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.post("/searchcoursetitle", async (req, res) => {

    console.log(req.body)

    var t = JSON.stringify(req.body.data).toLowerCase();
    t = JSON.parse(t.replace(/\s+/g, ''));

    console.log("searching for " + JSON.stringify(t))
    console.log("f " + req.body.filter + " l: " + req.body.lang)

    var list;
    var price;
    if (req.body.filter === 'Thirty') {
        console.log("hereee1")
        price = 30
        list = await db.collection('users').where('price', '<=', price).where('takenTitles', 'array-contains', req.body.data).get();
    } else if (req.body.filter === 'Twenty') {
        console.log("hereee2")
        price = 20
        list = await db.collection('users').where('price', '<=', price).where('takenTitles', 'array-contains', req.body.data).get();
    } else if (req.body.filter === 'Ten') {
        console.log("hereee3")
        price = 10
        list = await db.collection('users').where('price', '<=', price).where('takenTitles', 'array-contains', req.body.data).get();
    } else if (req.body.filter === 'Language') {
        console.log("hereee4")
        list = await db.collection('users').where('lang', '=', JSON.parse(JSON.stringify(req.body.lang).toLowerCase())).where('takenTitles', 'array-contains', req.body.data).get();
    }
    else if (req.body.filter == 'priceLow') {
        list = await db.collection('users').orderBy('price', 'asc').where('takenTitles', 'array-contains', req.body.data).get();
    }
    else if (req.body.filter == 'priceHigh') {
        list = await db.collection('users').orderBy('price', 'desc').where('takenTitles', 'array-contains', req.body.data).get();
    }
    else if (req.body.filter === 'ratingLow') {
        list = await db.collection('users').orderBy('tutorRating', 'asc').where('takenTitles', 'array-contains', req.body.data).get();
    }
    else if (req.body.filter === 'ratingHigh') {
        list = await db.collection('users').orderBy('tutorRating', 'desc').where('takenTitles', 'array-contains', req.body.data).get();
    }
    else {
        list = await db.collection('users').where('takenTitles', 'array-contains', req.body.data).get();
    }


    console.log(list.size)
    var users = {};
    for (i in list.docs) {
        console.log(list.docs[i].get("username"))
        var u = list.docs[i];
        //users.push(u.get("username"))
        users[u.get("username")] = { venmo: u.get("venmo"), fname: u.get('FName'), lname: u.get('LName'), price: u.get('price'), studentRating: u.get("studentRating"), tutorRating: u.get("tutorRating"), lang: u.get('lang'), taken: u.get("takenTitles") }

    }
    if (Object.keys(users).includes(req.body.currUser)) {
        delete users[req.body.currUser]

    }

    if (Object.keys(users).length == 0) {
        return res.send(JSON.stringify("none"))

    }

    console.log("sending " + users)

    return res.send(JSON.stringify(users))


});

app.post("/searchmultiplecourses", async (req, res) => {

    console.log("searching mutliple")
    var ar = req.body.data.split(",")
    var courses = [];
    let i = 0;
    while (i < ar.length) {
        var t = JSON.stringify(ar[i]).toLowerCase();
        t = JSON.parse(t.replace(/\s+/g, ''));
        courses.push(t)
        i++;
    }



    console.log("searching for ")
    console.log(courses)
    var users = [];
    for (let j = 0; j < courses.length; j++) {
        console.log(courses[j])
        var list;
        var price;
        if (req.body.filter === 'Thirty') {
            console.log("hereee1")
            price = 30
            list = await db.collection('users').where('price', '<=', price).where('takenTitles', 'array-contains', courses[j]).get();
        } else if (req.body.filter === 'Twenty') {
            console.log("hereee2")
            price = 20
            list = await db.collection('users').where('price', '<=', price).where('takenTitles', 'array-contains', courses[j]).get();
        } else if (req.body.filter === 'Ten') {
            console.log("hereee3")
            price = 10
            list = await db.collection('users').where('price', '<=', price).where('takenTitles', 'array-contains', courses[j]).get();
        } else if (req.body.filter === 'Language') {
            console.log("hereee4")
            list = await db.collection('users').where('lang', '=', JSON.parse(JSON.stringify(req.body.lang).toLowerCase())).where('takenTitles', 'array-contains', courses[j]).get();
        }
        else if (req.body.filter == 'priceLow') {
            list = await db.collection('users').orderBy('price', 'asc').where('takenTitles', 'array-contains', courses[j]).get();
        }
        else if (req.body.filter == 'priceHigh') {
            list = await db.collection('users').orderBy('price', 'desc').where('takenTitles', 'array-contains', courses[j]).get();
        }
        else if (req.body.filter === 'ratingLow') {
            list = await db.collection('users').orderBy('tutorRating', 'asc').where('takenTitles', 'array-contains', courses[j]).get();
        }
        else if (req.body.filter === 'ratingHigh') {
            list = await db.collection('users').orderBy('tutorRating', 'desc').where('takenTitles', 'array-contains', courses[j]).get();
        }
        else {
            list = await db.collection('users').where('takenTitles', 'array-contains', courses[j]).get();
        }
        var tempUsers = [];
        console.log(list.size)
        for (let k = 0; k < list.size; k++) {
            tempUsers.push(list.docs[k].get("username"))
        }
        console.log(tempUsers)
        users.push(tempUsers)

    }

    let finalList = users[0]
    let toRemove = [];
    for (let a = 0; a < finalList.length; a++) {

        let inAll = true;
        for (let b = 1; b < users.length; b++) {
            if (!users[b].includes(finalList[a])) {
                inAll = false;
            }
        }
        if (!inAll) {
            toRemove.push(finalList[a])
        }
    }
    for (let c = 0; c < toRemove.length; c++) {
        finalList.splice(finalList.indexOf(toRemove[c]), 1)
    }

    if (finalList.includes(req.body.currUser)) {
        finalList.splice(finalList.indexOf(req.body.currUser), 1)
    }

    if (finalList.length === 0) {
        return res.send(JSON.stringify("none"))
    }

    var data = {};
    for (u in finalList) {
        var us = await db.collection('users').where('username', '==', finalList[u]).get();
        var user = us.docs[0]
        console.log(" find " + finalList[u] + " " + user.get("FName"))
        data[finalList[u]] = { fname: user.get("FName"), lname: user.get('LName'), price: user.get('price'), "studentRating": user.get("studentRating"), "tutorRating": user.get("tutorRating"), lang: user.get('lang'), taken: user.get("takenTitles") }
    }

    return res.send(JSON.stringify(data))


});

app.post("/searchtutorname", async (req, res) => {
    console.log("seraching name")
    var fname = req.body.data.toLowerCase();
    var lname = "";
    console.log("jharna look tutor");
    if (fname.includes(" ")) {
        var ar = fname.split(" ");
        fname = ar[0]
        lname = ar[1]
    }
    var list;
    var price;
    if (req.body.filter === 'Thirty') {
        console.log("hereee1")
        price = 30
        list = await db.collection('users').where('price', '<=', price).where('FNameLower', '==', fname).get();
    } else if (req.body.filter === 'Twenty') {
        console.log("hereee2")
        price = 20
        list = await db.collection('users').where('price', '<=', price).where('FNameLower', '==', fname).get();
    } else if (req.body.filter === 'Ten') {
        console.log("hereee3")
        price = 10
        list = await db.collection('users').where('price', '<=', price).where('FNameLower', '==', fname).get();
    } else if (req.body.filter === 'Language') {
        console.log("hereee4")
        list = await db.collection('users').where('lang', '==', JSON.parse(JSON.stringify(req.body.lang).toLowerCase())).where('FNameLower', '==', fname).get();
    }
    else if (req.body.filter == 'priceLow') {
        list = await db.collection('users').orderBy('price', 'asc').where('FNameLower', '==', fname).get();
    }
    else if (req.body.filter == 'priceHigh') {
        list = await db.collection('users').orderBy('price', 'desc').where('FNameLower', '==', fname).get();
    }
    else if (req.body.filter === 'ratingLow') {
        list = await db.collection('users').orderBy('tutorRating', 'asc').where('FNameLower', '==', fname).get();
    }
    else if (req.body.filter === 'ratingHigh') {
        list = await db.collection('users').orderBy('tutorRating', 'desc').where('FNameLower', '==', fname).get();
    }
    else {
        list = await db.collection('users').where('FNameLower', '==', fname).get();
    }
    var users = [];
    console.log("ll " + list.size)
    for (i in list.docs) {
        console.log(list.docs[i].get("username"))
        var u = list.docs[i];
        users.push(u.get("username"))
    }

    if (lname != "") {
        var price;
        if (req.body.filter === 'Thirty') {
            console.log("hereee1")
            price = 30
            list = await db.collection('users').where('price', '<=', price).where('LNameLower', '==', lname).get();
        } else if (req.body.filter === 'Twenty') {
            console.log("hereee2")
            price = 20
            list = await db.collection('users').where('price', '<=', price).where('LNameLower', '==', lname).get();
        } else if (req.body.filter === 'Ten') {
            console.log("hereee3")
            price = 10
            list = await db.collection('users').where('price', '<=', price).where('LNameLower', '==', lname).get();
        } else if (req.body.filter === 'Language') {
            console.log("hereee4")
            list = await db.collection('users').where('lang', '==', JSON.parse(JSON.stringify(req.body.lang).toLowerCase())).where('LNameLower', '==', lname).get();
        }
        else if (req.body.filter == 'priceLow') {
            list = await db.collection('users').orderBy('price', 'asc').where('LNameLower', '==', lname).get();
        }
        else if (req.body.filter == 'priceHigh') {
            list = await db.collection('users').orderBy('price', 'desc').where('LNameLower', '==', lname).get();
        }
        else if (req.body.filter === 'ratingLow') {
            list = await db.collection('users').orderBy('tutorRating', 'asc').where('LNameLower', '==', lname).get();
        }
        else if (req.body.filter === 'ratingHigh') {
            list = await db.collection('users').orderBy('tutorRating', 'desc').where('LNameLower', '==', lname).get();
        }
        else {

            list = await db.collection('users').where('LNameLower', '==', lname).get();
        }
        console.log("ll " + list.size)
        for (i in list.docs) {
            console.log(list.docs[i].get("username"))
            var u = list.docs[i];
            users.push(u.get("username"))
        }
    }

    let finalList = [...new Set(users)]

    if (finalList.includes(req.body.currUser)) {
        finalList.splice(finalList.indexOf(req.body.currUser), 1)
    }
    if (finalList.length == 0) {
        return res.send(JSON.stringify("none"))
    }

    var data = {};
    for (u in finalList) {
        var us = await db.collection('users').where('username', '==', finalList[u]).get();
        var user = us.docs[0]
        console.log(" find " + finalList[u] + " " + user.get("FName"))
        data[finalList[u]] = { fname: user.get("FName"), lname: user.get('LName'), price: user.get('price'), "studentRating": user.get("studentRating"), "tutorRating": user.get("tutorRating"), lang: user.get('lang'), taken: user.get('takenTitles') }
    }

    return res.send(JSON.stringify(data))


});

app.post("/searchprofname", async (req, res) => {

    var prof = req.body.data.toLowerCase();
    console.log("searching for " + prof)

    var list;
    var price;
    if (req.body.filter === 'Thirty') {
        console.log("hereee1")
        price = 30
        list = await db.collection('users').where('price', '<=', price).where('takenProfs', 'array-contains', prof).get();
    } else if (req.body.filter === 'Twenty') {
        console.log("hereee2")
        price = 20
        list = await db.collection('users').where('price', '<=', price).where('takenProfs', 'array-contains', prof).get();
    } else if (req.body.filter === 'Ten') {
        console.log("hereee3")
        price = 10
        list = await db.collection('users').where('price', '<=', price).where('takenProfs', 'array-contains', prof).get();
    } else if (req.body.filter === 'Language') {
        console.log("hereee4")
        list = await db.collection('users').where('lang', '==', JSON.parse(JSON.stringify(req.body.lang).toLowerCase())).where('takenProfs', 'array-contains', prof).get();
    }
    else if (req.body.filter == 'priceLow') {
        list = await db.collection('users').orderBy('price', 'asc').where('takenProfs', 'array-contains', prof).get();
    }
    else if (req.body.filter == 'priceHigh') {
        list = await db.collection('users').orderBy('price', 'desc').where('takenProfs', 'array-contains', prof).get();
    }
    else if (req.body.filter === 'ratingLow') {
        list = await db.collection('users').orderBy('tutorRating', 'asc').where('takenProfs', 'array-contains', prof).get();
    }
    else if (req.body.filter === 'ratingHigh') {
        list = await db.collection('users').orderBy('tutorRating', 'desc').where('takenProfs', 'array-contains', prof).get();
    }
    else {
        list = await db.collection('users').where('takenProfs', 'array-contains', prof).get();
    }
    var users = {};
    for (i in list.docs) {
        console.log(list.docs[i].get("username"))
        var u = list.docs[i];
        //users.push(u.get("username"))
        users[u.get("username")] = { fname: u.get('FName'), lname: u.get('LName'), price: u.get('price'), "studentRating": u.get("studentRating"), "tutorRating": u.get("tutorRating"), lang: u.get('lang'), taken: u.get("takenTitles") }

    }
    if (Object.keys(users).includes(req.body.currUser)) {
        delete users[req.body.currUser]

    }

    if (Object.keys(users).length == 0) {
        return res.send(JSON.stringify("none"))

    }


    return res.send(JSON.stringify(users))


});

app.post("/searchboards", async (req, res) => {

    var course = req.body.data.toLowerCase();
    console.log('board search for ' + course)

    var list = await db.collection('boards').where('class', '==', course).get();
    if (list.empty) {
        return res.send(JSON.stringify("none"))
    }

    var boards = [];
    for (var i = 0; i < list.size; i++) {
        boards.push(list.docs[i].get('name'))
    }

    return res.send(JSON.stringify(boards))

});

app.post("/joinboard", async (req, res) => {
    console.log("here " + req.body.board + " " + req.body.username)
    var list = await db.collection('users').where('username', '==', req.body.username).get();
    if (!list.empty) {
        var user = list.docs[0]
        var boards = user.get("boards")
        if (boards.includes(req.body.board)) {
            return res.send(JSON.stringify(req.body.username))
        }
        boards.push(req.body.board);
        await user.ref.update({ boards: boards });
    }
    return res.send(JSON.stringify(req.body.username))
})

app.post('/getposts', async (req, res) => {
    console.log("getting")
    var d = await db.collection('posts').where('board', '==', req.body.board).get();
    var posts = [];
    console.log(d.docs.length)
    for (var i = 0; i < d.docs.length; i++) {
        var data = [d.docs[i].get('text'), d.docs[i].get('user'), d.docs[i].get('link'), d.docs[i].get('anon'), d.docs[i].get('replies'), d.docs[i].get('pdf'), d.docs[i].get('pdfname')]
        posts.push(data);
    }
    return res.send(JSON.stringify({ posts: posts }))
})

app.post('/addpost', async (req, res) => {
    console.log("add post")
    var data = {
        board: req.body.board,
        text: req.body.text,
        user: req.body.user,
        link: req.body.link,
        anon: req.body.anon,
        replies: [],
        upvotes: [],
        downvotes: [],
        replies: [],
        pdf: req.body.pdf
    };

    if (req.body.pdf) {
        data.pdfname = req.body.pdfname
    }

    //console.log(data)

    const r = await db.collection('posts').doc().set(data);
    console.log("getting")
    var d = await db.collection('posts').where('board', '==', req.body.board).get();
    var posts = [];
    console.log(d.docs.length)
    for (var i = 0; i < d.docs.length; i++) {
        var data = [d.docs[i].get('text'), d.docs[i].get('user'), d.docs[i].get('link'), d.docs[i].get('anon'), d.docs[i].get('replies'), d.docs[i].get('pdf'), d.docs[i].get('pdfname')]
        posts.push(data);
    }
    return res.send(JSON.stringify({ posts: posts }))

})

app.post('/addreply', async (req, res) => {
    console.log("adding reply")
    var info = req.body.text + "~" + req.body.user + "~" + req.body.anon + "~0~0"
    var list = await db.collection('posts').where('text', '==', req.body.post).where('board', '==', req.body.board).get();
    //console.log(list.size + " " + req.body.post + " " + req.body.board)
    var doc = list.docs[0]
    var replies = doc.get('replies');
    replies.push(info);
    //console.log(replies + " cftvgbhj")
    await doc.ref.update({ replies: replies })
    list = await db.collection('posts').where('text', '==', req.body.post).where('board', '==', req.body.board).get();
    doc = list.docs[0]
    var p = await db.collection('posts').where('board', '==', req.body.board).get()
    //var pp = p.docs[0]
    var posts = [];
    var count;
    console.log(p.docs.length)
    for (var i = 0; i < p.docs.length; i++) {
        var data = [p.docs[i].get('text'), p.docs[i].get('user'), p.docs[i].get('link'), p.docs[i].get('anon'), p.docs[i].get('replies'), p.docs[i].get('pdf'), p.docs[i].get('pdfname')]
        posts.push(data);
        if (p.docs[i].get('text') === req.body.post) {
            count = i;
        }
    }

    console.log(p.docs[count].get('replies'))

    return res.send(JSON.stringify({ replies: doc.get('replies'), posts: posts, count: count }))

})

app.post('/checkvaliduser', async (req, res) => {
    console.log("checking")
    var list = await db.collection('users').where('username', '==', req.body.user).get()
    if (list.size == 0) {
        return res.send(JSON.stringify("error"))
    }
    return res.send(JSON.stringify("success"))


})

/*
app.post('/uploadpdfboard', upload.single("file"), async (req, res) => {
    console.log("upload pdf board")
    const {
        file,
        body: { user, board, link }
    } = req;
    var data = {
        board: req.body.board,
        user: req.body.user,
        link: req.body.link,
        text: file
    };

    const r = await db.collection('posts').doc().set(data);
    
    var doc = login.docs[0];
    await doc.ref.update({ tutor: true })
    console.log("2")
    return res.send(JSON.stringify({ "studentRating": doc.get("studentRating"), "tutorRating": doc.get("tutorRating"), "u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": doc.get("active"), "userUniqueString": doc.get("userUniqueString"), "followers": doc.get("followers"), "following": doc.get("following"), "lang": doc.get("lang"), taking: doc.get("taking"), tutor: doc.get("tutor"), price: doc.get("price"), taken: doc.get("taken") }))

})
*/
app.post("/info", async (req, res) => {
    console.log("iii " + req.body["username"] + " otehr " + req.body.currU)
    const login = await db.collection('users').where('username', '==', req.body["username"]).get();
    if (login.empty) {
        return res.send("error")
    }
    var doc = login.docs[0];


    console.log("aaa " + doc.get("active"))
    console.log("look here are your followers: " + doc.get("followers"))

    var follows = false;
    if (req.body.currU !== undefined && doc.get("followers").includes(req.body.currU)) {
        follows = true;
    }

    return res.send(JSON.stringify({ "u": req.body["username"], "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": doc.get("active"), "userUniqueString": doc.get("userUniqueString"), "followers": doc.get("followers"), "following": doc.get("following"), "lang": doc.get("lang"), "profpic": doc.get("profpic"), "taking": doc.get("taking"), "taken": doc.get("taken"), "tutor": doc.get("tutor"), "price": doc.get("price"), "follows": follows, "studentRating": doc.get("studentRating"), "tutorRating": doc.get("tutorRating"), "venmo": doc.get("venmo"), }))


})

app.post("/rating", async (req, res) => {

    console.log(req.body.account + " " + req.body.username)
    const login = await db.collection('users').where('username', '==', req.body["username"]).get();
    if (login.empty) {
        return res.send("error")
    }
    var doc = login.docs[0];

    var currRating = 0;
    if (req.body.account === "tutor") {
        currRating = doc.get("tutorRating")
    }
    else if (req.body.account === "student") {
        currRating = doc.get("studentRating")
    }


    console.log("old rating = " + currRating)
    var rate = Math.round(((JSON.parse(req.body.rating1) + JSON.parse(req.body.rating2) + JSON.parse(req.body.rating3)) / 3) * 10) / 10
    if (currRating > 0) {
        currRating = Math.round(((currRating + rate) / 2) * 10) / 10

    } else {
        currRating = rate

    }
    console.log("new rating = " + currRating)


    if (req.body.account === "tutor") {
        await doc.ref.update({ tutorRating: currRating });
    }
    else if (req.body.account === "student") {
        await doc.ref.update({ studentRating: currRating });
    }

    console.log("done = " + await doc.get("studentRating"))

    return res.send(JSON.stringify({ "u": req.body.username }))


})

app.post("/deltranscript", async (req, res) => {
    var login = await db.collection('users').where('username', '==', req.body["username"]).get();
    if (!login.empty) {
        var doc = login.docs[0]
        //await doc.ref.update({ transcript: null });
        await doc.ref.update({ tutor: false });
        login = await db.collection('users').where('username', '==', req.body["username"]).get();
        doc = login.docs[0]
        console.log("no longer tutor " + doc.get("tutor"))
        var t = await db.collection("transcripts").doc(req.body["username"]).delete();
        return res.send(JSON.stringify({ "studentRating": doc.get("studentRating"), "tutorRating": doc.get("tutorRating"), "u": req.body["username"], "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": doc.get("active"), "userUniqueString": doc.get("userUniqueString"), "followers": doc.get("followers"), "following": doc.get("following"), "lang": doc.get("lang"), "profpic": doc.get("profpic"), taking: doc.get("taking"), tutor: doc.get("tutor"), price: doc.get("price"), taken: doc.get("taken") }))


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
    var venmo = doc.get("venmo")
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
    if (req.body.venmo != "" && req.body.venmo !== venmo) {
        await doc.ref.update({ venmo: req.body.venmo });
    }
    if (req.body.pass != "" && md5(req.body.pass) !== pass) {
        await doc.ref.update({ password: md5(req.body.pass) });
    }
    if (req.body.lang != "" && lang !== JSON.parse(JSON.stringify(req.body.lang).toLowerCase())) {
        await doc.ref.update({ lang: JSON.parse(JSON.stringify(req.body.lang).toLowerCase()) });
    }
    if (req.body.price != "" && Number(req.body.price) != price) {
        await doc.ref.update({ price: Number(req.body.price) });
    }

    const up = await db.collection('users').where('username', '==', user).get();
    doc = up.docs[0];
    return res.send(JSON.stringify({ "venmo": doc.get("venmo"), "studentRating": doc.get("studentRating"), "tutorRating": doc.get("tutorRating"), "u": doc.get("username"), "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": active, "lang": doc.get("lang"), "profpic": doc.get("profpic"), "taking": doc.get("taking"), "followers": doc.get("followers"), "following": doc.get("following"), "price": doc.get("price"), "taken": doc.get("taken") }))


})

app.post("/login", async (req, res) => {
    console.log("user: " + req.body["username"])

    const login = await db.collection('users').where('username', '==', req.body["username"]).where('password', '==', md5(req.body["pass"])).get();
    console.log("done")
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
    console.log("none " + md5(req.body["pass"]) + " ")
    return res.send(JSON.stringify("error"))
})

app.post("/addcourse", async (req, res) => {

    const login = await db.collection('users').where('username', '==', req.body.u).get();
    var doc = login.docs[0];

    c = doc.get("taking")

    info = { "title": req.body.title, "professor": req.body.prof, "semester": req.body.semester }

    // USE THIS WHEN SEARCHING TOO
    var t = JSON.stringify(req.body.title).toLowerCase();
    t = JSON.parse(t.replace(/\s+/g, ''));

    c[t] = info

    var listTitles = doc.get("takingTitles");
    listTitles.push(t);
    await doc.ref.update({ takingTitles: listTitles })

    var listProfs = doc.get("takingProfs");
    if (!listProfs.includes(req.body.prof.toLowerCase())) {
        listProfs.push(req.body.prof.toLowerCase());
        await doc.ref.update({ takingProfs: listProfs })
    }

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

    var listTitles = doc.get("takingTitles");
    listTitles.splice(listTitles.indexOf(JSON.stringify(t)), 1);
    await doc.ref.update({ takingTitles: listTitles })

    var listProfs = doc.get("takingProfs");
    if (!listProfs.includes(req.body.prof.toLowerCase())) {
        listProfs.splice(listProfs.indexOf(req.body.prof.toLowerCase()), 1);
        await doc.ref.update({ takingProfs: listProfs })
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

    info = { "title": req.body.title, "professor": req.body.prof, "semester": req.body.semester, "grade": req.body.grade }
    c[t] = info

    var listTitles = doc.get("takenTitles");
    listTitles.push(t);
    await doc.ref.update({ takenTitles: listTitles })

    var listProfs = doc.get("takenProfs");
    if (!listProfs.includes(req.body.prof.toLowerCase())) {
        listProfs.push(req.body.prof.toLowerCase());
        await doc.ref.update({ takenProfs: listProfs })
    }

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

    var listTitles = doc.get("takenTitles");
    listTitles.splice(listTitle.indexOf(JSON.stringify(t)), 1);
    await doc.ref.update({ takenTitles: listTitles })

    var listProfs = doc.get("takenProfs");
    if (!listProfs.includes(req.body.prof.toLowerCase())) {
        listProfs.splice(listProfs.indexOf(req.body.prof.toLowerCase()), 1);
        await doc.ref.update({ takenProfs: listProfs })
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
    console.log("the current user is " + currUser + " the old user " + oldUser)
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
    var venmo = oldUserDataDoc.get("venmo")



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
    return res.send(JSON.stringify({ "venmo": oldUserDataDoc.get("venmo"), "studentRating": oldUserDataDoc.get("studentRating"), "tutorRating": oldUserDataDoc.get("tutorRating"), "newFollowers": followers, "newFollowing": following, "u": oldUser, "fname": oldfname, "lname": oldlname, "email": oldemail, "followers": oldfollowers, "active": oldactive, "lang": oldlang, "taking": oldcourse, price: oldUserDataDoc.get("price"), "profpic": oldPFP, "tutor": oldUserDataDoc.get("tutor") })) // idk if this is the right price


});


app.post("/pfpupload", async (req, res) => {
    console.log("got in profile picture upload");
    var u = req.body.username
    console.log("1");
    const passsec = await db.collection('users').where('username', '==', req.body.username).get();
    console.log("2")
    var doc = passsec.docs[0];
    console.log("2.2")
    var user = doc.get("username")
    var profpic = doc.get("profpic")
    console.log("2.4")
    //if (req.body["pfpurl"] !== profpic) {
    console.log("2.75")
    //console.log(req.body.pfpurl)
    await doc.ref.update({ profpic: req.body.pfpurl });
    console.log("3")
    //}


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
    return res.send(JSON.stringify({ "studentRating": doc.get("studentRating"), "tutorRating": doc.get("tutorRating"), "u": req.body["username"], "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": doc.get("active"), "userUniqueString": doc.get("userUniqueString"), "followers": doc.get("followers"), "following": doc.get("following"), "lang": doc.get("lang"), "profpic": doc.get("profpic"), taking: doc.get("taking"), tutor: doc.get("tutor"), price: doc.get("price"), taken: doc.get("taken") }))

});

app.post("/getboards", async (req, res) => {
    var list = await db.collection('users').where("username", '==', req.body.username).get();
    if (!list.empty) {
        //var boards =
        console.log("sending")
        return res.send(JSON.stringify({ boards: list.docs[0].get("boards") }))
    }
});



app.post("/createdisc", async (req, res) => {
    console.log("------------hello--------------")
    console.log("before set doc " + req.body.name + " " + req.body.course);
    var data = {
        name: req.body.name,
        class: req.body.course
    };
    var list = await db.collection('boards').where('name', '==', req.body.name).get();
    if (!list.empty) {
        console.log("here")
        return res.send(JSON.stringify("error"))
    }
    const r = await db.collection('boards').doc(req.body.name).set(data);
    //console.log("at the end of post");
    var list = await db.collection('users').where("username", '==', req.body.username).get();
    if (!list.empty) {
        //var boards =
        console.log("sending")
        var boards = list.docs[0].get("boards");
        boards.push(req.body.name)
        await list.docs[0].ref.update({ boards: boards })
        list = await db.collection('users').where("username", '==', req.body.username).get();
        return res.send(JSON.stringify({ boards: list.docs[0].get("boards") }))
    }
    //return res.send(JSON.stringify({"returnedName": req.body.name, "returnedClass": req.body.course }))
});

app.post('/leaveboard', async (req, res) => {
    console.log("leaving")
    var list = await db.collection('users').where('username', '==', req.body.user).get();
    var u = list.docs[0]
    var boards = u.get('boards')
    boards.splice(boards.indexOf(req.body.board), 1);
    await u.ref.update({ boards: boards });
    var list = await db.collection('users').where('username', '==', req.body.user).get();
    var doc = list.docs[0]
    var follows = false;
    if (req.body.currU !== undefined && doc.get("followers").includes(req.body.currU)) {
        follows = true;
    }
    return res.send(JSON.stringify({ "u": req.body.user, "fname": doc.get("FName"), "lname": doc.get("LName"), "email": doc.get("email"), "active": doc.get("active"), "userUniqueString": doc.get("userUniqueString"), "followers": doc.get("followers"), "following": doc.get("following"), "lang": doc.get("lang"), "profpic": doc.get("profpic"), "taking": doc.get("taking"), "taken": doc.get("taken"), "tutor": doc.get("tutor"), "price": doc.get("price"), "follows": follows, "studentRating": doc.get("studentRating"), "tutorRating": doc.get("tutorRating"), }))

})


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



//EVANS WAS HERE!! 3/24
require("dotenv").config();




