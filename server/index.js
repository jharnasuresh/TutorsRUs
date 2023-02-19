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

app.post("/register", async (req, res) => {
    console.log("here");
    await db.collection('Users').doc().set(req.body);
});
