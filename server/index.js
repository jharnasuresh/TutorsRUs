//libraries
const express = require("express");
const { db } = require('./firebase.js')
const app = express();
const bcrypt = require("bcrypt") //packate bcrypt imported
const PORT = process.env.PORT || 3001;
console.log("library imports work");
const users = [] //temporarily storing in array
app.use(express.urlencoded({extended:false}))
app.post("register", async (req, res) => {
    try {
        console.log("start try");
        const hashedPassword = await bcrypt.hash(req.body.pass)
        users.push({
            id: Date.now().toString(),
            name : req.body.firstName,
            //email:req.body.email,
            password: hashedPassword
        })
        console.log("end try");
        console.log(users);
        res.redirect("/login")
    } catch (e) {
        console.log(e);
        res.redirect("/register");
    }
})
app.get("/api", (req, res) => {
    res.json({ message: "ur mom" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

