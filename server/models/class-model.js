const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    department: { type: String, required: true }, 
    semester: { type: Number, required: true },   
    group: { type: String, required: true },     
    totalStudents: { type: Number, required: true } 
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
