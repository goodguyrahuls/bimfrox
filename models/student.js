const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const studentSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
});

studentSchema.plugin(passportLocalMongoose, {
    usernameField: "userid"
});

module.exports = mongoose.model('Student', studentSchema);