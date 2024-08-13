const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher-controller');
const authMiddleware = require("../middlewares/auth-middleware");
const teacherMiddleware = require("../middlewares/teacher-middleware");

// Existing routes
router.get('/classes', authMiddleware, teacherMiddleware, teacherController.getAllClasses);
router.get('/classes/:id', authMiddleware, teacherMiddleware, teacherController.getClassById);
router.put('/classes/update/:id', authMiddleware, teacherMiddleware, teacherController.updateClassById);
router.post('/classes/add', authMiddleware, teacherMiddleware, teacherController.addClass);
router.delete('/classes/delete/:id', authMiddleware, teacherMiddleware, teacherController.deleteClassById);



module.exports = router;
