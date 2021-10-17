const { Router } = require('express');
const { check } = require('express-validator');
const { esRoleValido, correoExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosDelete, usuariosPost } = require('../controllers/usuarios');
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');
const router = Router();

router.get(
    '/', 
    usuariosGet);

//router.post( ruta, middlewares, controlador );
//es un middlewares que va a validar un campo del resquest.body
//en este caso le espécificamos que valida el campo correo,
//de ser incorrecto va a apilar un objeto de error
/*
de esta manera, donde va a especificar el msg que 
le mandamos como segundo parametro
"errors": [
        {
            "value": "andres_angeles@hotmailcom",
            "msg": "El correo no es valido",
            "param": "correo",
            "location": "body"
        }
    ]
*/
//https://express-validator.github.io/docs/validation-chain-api.html
router.post(
    '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de más de 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es valido').isEmail(),
        //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
        //(rol) => esRoleValido(rol) == esRoleValido
        check('rol').custom( esRoleValido ),
        check('correo').custom( correoExiste ),
        validarCampos
    ],
    usuariosPost
);

router.put(
    '/:id', 
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos
    ],
    usuariosPut);

router.delete(
    '/:id',
    [
        validarJWT,
        //esAdminRole,
        tieneRole('USER_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
    ],
    usuariosDelete);

module.exports = router;