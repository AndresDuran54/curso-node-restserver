const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Para el tipo de petición POST con sub path login indicamos su middlewares
//y su controlador
router.post(
    '/login', 
    [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login);

module.exports = router;
