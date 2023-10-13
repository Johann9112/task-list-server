const express = require('express');
const { validateParams } = require('./middlewares');
const { readTasksFromFile, writeTasksToFile } = require('./dataHandler');
const { verifyJWT } = require('./auth');
const router = express.Router();

function validateTaskRequest(req, res, next) {
    if (['POST', 'PUT'].includes(req.method)) {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Cuerpo de solicitud vacío' });
        }

        const { id, tarea, responsable, cumplida } = req.body;

        if (req.method === 'POST' && (!id || !tarea || !responsable || cumplida === undefined)) {
            return res.status(400).json({ message: 'Información no válida o atributos faltantes para crear la tarea' });
        }

        if (req.method === 'PUT' && (!tarea && !responsable && cumplida === undefined)) {
            return res.status(400).json({ message: 'Información no válida o atributos faltantes para actualizar la tarea' });
        }
    }
    next();
}

router.use(verifyJWT);
router.use(validateTaskRequest);
router.use(validateParams);

router.get('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    readTasksFromFile((err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el archivo' });
        }

        const task = tasks.find(t => t.id === taskId);

        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.json(task);
    });
});

router.put('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    readTasksFromFile((err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el archivo' });
        }

        const task = tasks.find(t => t.id === taskId);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        task.tarea = req.body.tarea || task.tarea;
        task.responsable = req.body.responsable || task.responsable;
        task.cumplida = req.body.cumplida !== undefined ? req.body.cumplida : task.cumplida;

        writeTasksToFile(tasks, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error en el archivo' });
            }
            res.json(task);
        });
    });
});

router.delete('/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    readTasksFromFile((err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el archivo' });
        }

        const newTasks = tasks.filter(t => t.id !== taskId);
        writeTasksToFile(newTasks, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error en el archivo' });
            }
            res.json({ message: `Tarea ${taskId} eliminada` });
        });
    });
});

router.post('/', (req, res) => {
    const newTask = req.body;
    if (!newTask.id) {
        return res.status(400).json({ message: 'Falta ID' });
    }

    readTasksFromFile((err, tasks) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el archivo' });
        }

        if (tasks.some(task => task.id === newTask.id)) {
            return res.status(400).json({ message: 'El ID ya existe' });
        }

        tasks.push(newTask);
        writeTasksToFile(tasks, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error en el archivo' });
            }
            res.status(201).json(newTask);
        });
    });
});

module.exports = router;
