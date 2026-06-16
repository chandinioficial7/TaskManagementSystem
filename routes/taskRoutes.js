const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create Task
router.post('/', authMiddleware, async (req, res) => {
    try {

        const { title, description } = req.body;

        const task = new Task({
            title,
            description
        });

        await task.save();

        res.status(201).json({
            message: 'Task Created Successfully',
            task
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

// Get All Tasks
router.get('/', authMiddleware, async (req, res) => {
    try {

        const tasks = await Task.find();

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

// Update Task
router.put('/:id', authMiddleware, async (req, res) => {
    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: 'Task Updated Successfully',
            updatedTask
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

// Delete Task
router.delete('/:id', authMiddleware, async (req, res) => {
    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: 'Task Deleted Successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

module.exports = router;