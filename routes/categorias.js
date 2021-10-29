const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

/*
{{url}}/api/categorias
*/

//Obtener todas las categorias - público
router.get(
    '/',
    obtenerCategorias
);

//Obtener un categoria por id - publico
router.get(
    '/:id', 
    [
        check('id','No es un id de Mongo válido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),
        validarCampos
    ],  
    obtenerCategoria
);

//Crear una nueva categoria - privado - cualquier persona con un token válido
router.post(
    '/', 
    [
        validarJWT,
        check('nombre','El nombre de la categoria es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCategoria
);

//Actualizar - privado - cualquier con token válido
router.put(
    '/:id', 
    [
        validarJWT,
        check('id').custom( existeCategoriaPorId ),
        check('nombre','El nombre de la categoria es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCategoria
);

//Borrar una categoria - Admin
router.delete(
    '/:id', 
    [
        validarJWT,
        esAdminRole,
        check('id','No es un id de Mongo válido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),
        validarCampos
    ], 
    borrarCategoria
);

module.exports = router;