const express = require('express');
const Contact = require('../models/contact');
const Admin = require('../models/admin');
const passport = require('passport');
const router = express.Router();


//Index route
router.get("/", (req, res) => {
    res.render("frox/index.ejs");
})

//Contact route
router.get("/contact", (req, res) => {
    res.render("frox/contact.ejs");
})

router.post("/contact", async(req, res) => {
    let {name, ph, email, message} = req.body;
    let client = new Contact({
        name: name,
        ph: ph,
        email: email,
        message: message,
    })
    await client.save();
    res.redirect("/");
})

router.get("/dashboard", (req, res) => {
    res.render("frox/adminform.ejs");
})

router.post("/dashboard", passport.authenticate("local", {failureRedirect: "/"}) ,async(req, res) => {
    let contacts = await Contact.find();
    res.render("frox/admin.ejs", { contacts });
})

router.get("/signup", async (req, res) => {
    let newAdmin = new Admin({
        email: "mayurborse9119@gmail.com",
        username: "bimfroxadmin"
    })

    let password = "bim336591"

    let regAdmin = await Admin.register(newAdmin, password);
    res.send(regAdmin);
})

router.get("/about", (req, res) => {
    res.render("frox/about.ejs");
})

router.get("/services", (req, res) => {
    res.render("frox/service.ejs");
})

router.get("/projects", (req, res) => {
    res.render("frox/project.ejs");
})

router.get("/blogs", (req, res) => {
    res.render("frox/blog.ejs");
})

router.get("/program", (req, res) => {
    res.render("frox/program.ejs")
})


router.get("/students", (req, res) => {
    res.render("")
})


module.exports = router;