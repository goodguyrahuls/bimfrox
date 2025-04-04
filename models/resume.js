const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    resume: {
        data: Buffer, // File data
        contentType: String, // File type (PDF, DOCX, etc.)
    }
});

const Student = mongoose.model("Student", studentSchema);


module.exports = Student;