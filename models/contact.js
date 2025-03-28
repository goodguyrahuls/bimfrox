const mongoose = require('mongoose');
const { type } = require('os');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ph: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
})

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;