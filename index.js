    const express = require('express');
    const app = express();
    const path = require('path');

    const Contact = require("./models/contact.js");
    const port = 3000;

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "/views"));

    app.use(express.static(path.join(__dirname, "/public")));
    app.use(express.urlencoded({extended: true}))

    const mongoose = require('mongoose');

    main().catch(err => console.log(err));
    
    async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/webnova');
    
      // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    }

    //Index route
    app.get("/webnova", (req, res) => {
        res.render("index.ejs");
    })

    //Contact route
    app.get("/webnova/contact", (req, res) => {
        res.render("contact.ejs");
    })

    app.post("/webnova/contact", async(req, res) => {
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





    app.listen(port, () => {
        console.log("Server is now listening on local port");
    })