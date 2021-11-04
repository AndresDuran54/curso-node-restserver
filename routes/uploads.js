const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivoSubir } = require('../middlewares');

const router = Router();

router.post(
    '/',
    validarArchivoSubir,
    cargarArchivo
);

router.put(
    '/:coleccion/:id',
    [
        validarArchivoSubir,
        check('id','El id debe de ser de Mongo').isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
        validarCampos
    ],
    actualizarImagenCloudinary//actualizarImagen
);

router.get(
    '/:coleccion/:id',
    [

    ],
    mostrarImagen
);
0
module.exports = router;
