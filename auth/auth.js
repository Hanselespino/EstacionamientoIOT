const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const SECRET_KEY = 'proyecto_EstacionamientoIoT';

exports.signUp = async (req, res) => {
    try {
        if (!req.body.user || !req.body.password) {
            return res.status(400).json({ error: "El usuario y la contraseña son obligatorios, ¡No puedes dejarlos vacíos!" });
        }
        const user = await new User({
            user: req.body.user,
            password: req.body.password,
            seccion: req.body.seccion,
            cantMax: req.body.cantMax
        });
        const savedUser = await user.save();
        const payload = { id: savedUser.id, user: savedUser.user};
        const token = jwt.sign(payload, SECRET_KEY);
        res.status(200).json({ savedUser, token });
    } catch (err) {
        console.log(err);
        res.status(500).send('signUp: Hubo un error' + err);
    }
}

exports.login = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
            res.status(400).send('ID no Valido');
            return;
        }

        const user = await User.findById(req.body.id);

        if (!user) {
            res.status(401).send('ID no encontrado!');
            return;
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            res.status(401).send('ID o contraseña incorrecta!');
            return;
        } else {
            const payload = { id: user.id, user: user.user};
            const token = jwt.sign(payload, SECRET_KEY);
            res.status(200).json({ user, token });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('login: Hubo un error' + err);
    }
}

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send('Falta el token de Autenticación');
        return;
    }

    const [type, token] = authHeader.split(' ');

    if (type !== "Bearer") {
        res.status(401).send('Tipo de Token no es válido');
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch {
        res.status(401).send('Token invalido');
    }
}