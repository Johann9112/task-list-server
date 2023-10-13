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


function validateParams(req, res, next) {

    if (req.query.responsable && typeof req.query.responsable !== 'string') {
        return res.status(400).json({ message: 'Parámetro responsable inválido' });
    }

    next();
}


router.use(validateParams);

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
