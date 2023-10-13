const express = require('express');
const { readTasksFromFile } = require('./dataHandler');
const { validateParams } = require('./middlewares');
const router = express.Router();

router.use(validateParams);

router.get('/', (req, res) => {
    readTasksFromFile((err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }
        res.json(tasks);
    });
});

router.get('/completed', (req, res) => {
    readTasksFromFile((err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }

        let completedTasks = tasks.filter(task => task.cumplida);

        if (req.query.responsable) {
            completedTasks = completedTasks.filter(task => task.responsable === req.query.responsable);
        }

        res.json(completedTasks);
    });
});

router.get('/incomplete', (req, res) => {
    readTasksFromFile((err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el archivo' });
        }

        let incompleteTasks = tasks.filter(task => !task.cumplida);

        if (req.query.responsable) {
            incompleteTasks = incompleteTasks.filter(task => task.responsable === req.query.responsable);
        }

        res.json(incompleteTasks);
    });
});

module.exports = router;
