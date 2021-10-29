const { response, request } = require('express');
const { Producto } = require('../models');

const crearProducto = async (req, res = response) => {

    const {estado, usuario, nombre, ...body} = req.body;

    const productoDB = await Producto.findOne( {nombre: nombre.toUpperCase()} );

    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`,
        });
    }
    console.log("Holaaaaa");
    //Generar la data a guardar
    const data = {
        ...body,
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id,
    }

    //Creamos nuestro objeto
    const producto = new Producto( data );

    //Guardar en la DB
    await producto.save();

    res.status(201).json( producto );
}

//obtenerCategorias - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = {estado: true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('categoria', 'nombre')
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limit))
    ])

    res.json({
        total,
        productos
    });
}

//obtenerCategoria - populate {}
const obtenerProducto = async (req, res = response) => {

    const { id } = req.params;

    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);
}

//Actualizar - categoria
const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

//BorrarCategoria - estado: false
const borrarProducto = async( req, res = response) => {

    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(productoBorrado);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}