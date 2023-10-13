const express = require('express');
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
const { authRouter, verifyJWT } = require('./auth');
const { validateHttpMethod } = require('./middlewares');

require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(validateHttpMethod);
app.use('/auth', authRouter);
app.use('/tasks', listViewRouter);
app.use('/tasks', listEditRouter);

app.get('/ruta-protegida', verifyJWT, (req, res) => {
    res.json({ message: 'Estás en una ruta protegida!', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
