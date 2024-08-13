const Class = require('../models/class-model'); // Adjust the path to your Class model

// Get All Classes
const getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching classes', error });
    }
};

// Get Class by ID
const getClassById = async (req, res) => {
    try {
        const classData = await Class.findById(req.params.id);
        if (!classData) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(classData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching class', error });
    }
};

// Update Class by ID
const updateClassById = async (req, res) => {
    try {
        const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json(updatedClass);
    } catch (error) {
        res.status(500).json({ message: 'Error updating class', error });
    }
};

// Delete Class by ID
const deleteClassById = async (req, res) => {
    try {
        const deletedClass = await Class.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting class', error });
    }
};

// Add a New Class
const addClass = async (req, res) => {
    try {
        const { department, semester, group, totalStudents } = req.body;

        // Validate input
        if (!department || !semester || !group || !totalStudents) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new class
        const newClass = new Class({
            department,
            semester,
            group,
            totalStudents
        });

        // Save the class to the database
        await newClass.save();

        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ message: 'Error adding class', error });
    }
};


module.exports = { getAllClasses, getClassById, updateClassById, deleteClassById, addClass };
