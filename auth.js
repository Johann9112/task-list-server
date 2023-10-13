const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


const users = [
    {
        username: 'usuario1',
        password: 'contraseña1'
    },
    {
        username: 'usuario2',
        password: 'contraseña2'
    }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Credenciales no válidas' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
});

function verifyJWT(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.user = decoded;
        next();
    });
}

module.exports = {
    authRouter: router,
    verifyJWT
};
