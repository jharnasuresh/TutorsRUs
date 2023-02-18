const express = require("express");
const { db } = require('./firebase.js')
const cors = require('cors')

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

app.get("/api", (req, res) => {
    res.json({ message: "ur mom" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.post("/register", (req, res) => {
    console.log("here");
    res.json = db.collection('Users').doc(req.body.user).set(req.body);
    return res.json();

});
