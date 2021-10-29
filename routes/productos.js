const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

/*
{{url}}/api/categorias
*/

//Obtener todas las categorias - público
router.get(
    '/',
    obtenerProductos
);

//Obtener un categoria por id - publico
router.get(
    '/:id', 
    [
        check('id','No es un id de Mongo válido').isMongoId(),
        check('id').custom( existeProductoPorId ),
        validarCampos
    ],  
    obtenerProducto
);

//Crear una nueva categoria - privado - cualquier persona con un token válido
router.post(
    '/', 
    [
        validarJWT,
        check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
        check('categoria','No es un id de Mongo válido').isMongoId(),
        check('categoria').custom(existeCategoriaPorId),
        validarCampos
    ],
    crearProducto
);

//Actualizar - privado - cualquier con token válido
router.put(
    '/:id', 
    [
        validarJWT,
        //check('categoria','No es un id de Mongo válido').isMongoId(),
        //check('categoria').custom(existeCategoriaPorId),
        check('id').custom( existeProductoPorId ),
        validarCampos
    ],
    actualizarProducto
);

//Borrar una categoria - Admin
router.delete(
    '/:id', 
    [
        validarJWT,
        esAdminRole,
        check('id','No es un id de Mongo válido').isMongoId(),
        check('id').custom( existeProductoPorId ),
        validarCampos
    ], 
    borrarProducto
);

module.exports = router;