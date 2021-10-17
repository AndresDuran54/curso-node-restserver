const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {
    
    //Obtenemos un campo del header de la petición
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    console.log(token);

    
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'token no válido - usuario no existente en BD'
            });
        }

        //Verificar si el uid tien estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'token no válido - usuario con estado false'
            });
        }

        req.usuario = usuario;

        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
}

module.exports = {
    validarJWT
}