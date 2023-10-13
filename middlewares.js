function validateHttpMethod(req, res, next) {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    if (!validMethods.includes(req.method)) {
        return res.status(400).send('Metodo no permitido');
    }

    next();
}

function validateParams(req, res, next) {
    if (req.params.id && isNaN(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'ID de tarea inválido' });
    }

    next();
}


module.exports = {
    validateHttpMethod,
    validateParams
 
};
