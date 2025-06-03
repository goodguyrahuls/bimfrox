const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');
const multer = require("multer");
const asyncWrap = require("./utils/asyncWrap.js");
const session = require("express-session");
const LocalStratergy = require("passport-local");
const Admin = require("./models/admin.js");
const Student = require("./models/student.js");


const port = process.env.PORT || 3000;


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//routes
const frox = require("./routes/frox.js");
const passport = require('passport');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.engine("ejs", ejsMate);

// main()
// .then(() => {
//     console.log("MongoDB connected successfully");
// })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/webnova');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.error("MongoDB Connection Error:", err));

app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use("local-admin", new LocalStratergy(Admin.authenticate()));
passport.use("local-student", new LocalStratergy({ usernameField: "userid" }, Student.authenticate()));

passport.serializeUser((user, done) => {
  const userType = user instanceof Admin ? 'Admin' : 'Student';
  done(null, { id: user._id, type: userType });
});

passport.deserializeUser(async (obj, done) => {
  try {
    if (obj.type === 'Admin') {
      const admin = await Admin.findById(obj.id);
      done(null, admin);
    } else {
      const student = await Student.findById(obj.id);
      done(null, student);
    }
  } catch (err) {
    done(err);
  }
});


//bimfrox route
app.use("/", frox);


app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
})

