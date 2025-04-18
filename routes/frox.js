const express = require('express');
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

router.get("/admin", async(req, res) => {
    let contacts = await Contact.find();
    res.render("frox/admin.ejs", { contacts });
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