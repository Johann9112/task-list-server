const express = require('express');
const bodyParser = require('body-parser');
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

function validateHttpMethod(req, res, next) {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    
    if (!validMethods.includes(req.method)) {
        return res.status(400).send('Metodo no permitido');
    }

    next();
}

app.use(validateHttpMethod);

app.use('/tasks', listViewRouter);
app.use('/tasks', listEditRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
