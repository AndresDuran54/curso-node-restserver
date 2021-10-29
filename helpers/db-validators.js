const { Producto } = require('../models');
const Categoria = require('../models/categoria');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne( { rol } );
    if( !existeRol ){
        //Crea un nuevo ValidationError y lo agrega a Result<ValidationError>
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

//Verficar si el correo existe
//le pasamos un objeto especificando { campo_a_verificar : valor_a_verificar}
const correoExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });

    if(existeEmail){
        //Crea un nuevo ValidationError y lo agrega a Result<ValidationError>
        throw new Error(`El correo ${ correo } ya está registrado en la BD`);
    }
}

const existeUsuarioPorId = async (id) => {

    //Busca un archivo con el id que le pasamos
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        //Crea un nuevo ValidationError y lo agrega a Result<ValidationError>
        throw new Error(`El id no existe en la BD`);
    }
}

const existeCategoriaPorId = async (id) => {

    const existeCategoria = await Categoria.findById(id);

    if(!existeCategoria){
        //Crea un nuevo ValidationError y lo agrega a Result<ValidationError>
        throw new Error(`El id no existe en la BD`);
    }
}

const existeProductoPorId = async (id) => {

    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        //Crea un nuevo ValidationError y lo agrega a Result<ValidationError>
        throw new Error(`El id no existe en la BD`);
    }
}

module.exports = {
    esRoleValido,
    correoExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}

