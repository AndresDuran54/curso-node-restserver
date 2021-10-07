const {response, request} = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const { limit = 5, desde = 0 } = req.query;

    //const usuarios = await Usuario.find({ estado: true })
    //    .skip(Number(desde))
    //    .limit(Number(limit));

    //const total = await Usuario.countDocuments({ estado: true });

    //Promise.all([]) -> Ejecuta todas las promesas en diferentes hilos
    //haciendolo mucho màs ràpido
    //desestructuración en un arreglo
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res) => {

    const id = req.params.id;

    const { password, google, correo, id_, ...resto } = req.body;
    
    //TODO validar contra base de datos
    if ( password ) {
        const salt =  bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosDelete = async (req, res) => {

    const {id} = req.params;

    //Fisicamente lo borramos
    //const usuario =  await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(
        usuario
    );
}

const usuariosPost = async (req, res = response) => {

    //Extrae los errores de validación de una solicitud y los pone a disposición en un Resultobjeto.
    //Retorna un Result<ValidationError> -> Objeto que mantiene el estado actual de los errores de validación en una solicitud 
    //y permite el acceso a él de varias formas.
    /*
    Result {
        formatter: [Function: formatter],
        errors: [
            {
            value: 'andres_angeles@hotmailcom',
            msg: 'El correo no es valido',
            param: 'correo',
            location: 'body'
            }
        ]
    }
    */

    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la contraseña
    //Genera sincronamente un salt, donde
    //round -> Número de rondas a usar, el valor predeterminado es 10 si se omite
    const salt =  bcryptjs.genSaltSync();
    //Genera sincrónicamente un hash para la cadena dada.
    usuario.password = bcryptjs.hashSync(usuario.password, salt);

    /*
    Guarda este documento insertando un nuevo documento en la base de datos si document.isNew es true, 
    o envía una operación updateOne con solo las rutas modificadas si isNewes false.
    */
    await usuario.save();

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuariosPost
}