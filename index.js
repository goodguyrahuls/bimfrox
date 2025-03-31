const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const asyncWrap = require("./utils/asyncWrap.js");

const Contact = require("./models/contact.js");
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.engine("ejs", ejsMate);


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/webnova');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Index route
app.get("/frox", (req, res) => {
    res.render("webnova/index.ejs");
})

//Contact route
app.get("/frox/contact", (req, res) => {
    res.render("webnova/contact.ejs");
})

app.post("/frox/contact", async(req, res) => {
    let {name, ph, email, message} = req.body;
    let client = new Contact({
        name: name,
        ph: ph,
        email: email,
        message: message,
    })
    await client.save();
    res.redirect("/webnova");
})

app.get("/frox/admin", async(req, res) => {
    let contacts = await Contact.find();
    res.render("webnova/admin.ejs", { contacts });
})

app.get("/frox/about", (req, res) => {
    res.render("webnova/about.ejs");
})

app.get("/frox/services", (req, res) => {
    res.render("webnova/service.ejs");
})

app.get("/frox/projects", (req, res) => {
    res.render("webnova/project.ejs");
})

app.get("/frox/blogs", (req, res) => {
    res.render("webnova/blog.ejs");
})





app.listen(port, () => {
    console.log("Server is now listening on local port");
})