const express = require('express');
const fs = require('fs');
const router = express.Router();

const readTasksFromFile = (callback) => {
    fs.readFile('./tasks.json', 'utf8', (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(data));
        }
    });
};

router.get('/completed', (req, res) => {
    readTasksFromFile((err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }
        
        const completedTasks = tasks.filter(task => task.cumplida);
        res.json(completedTasks);
    });
});

router.get('/incomplete', (req, res) => {
    readTasksFromFile((err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }
        
        const incompleteTasks = tasks.filter(task => !task.cumplida);
        res.json(incompleteTasks);
    });
});

module.exports = router;
