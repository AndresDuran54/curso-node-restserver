const { Schema, model } = require('mongoose'); 

const ProductoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        require: true,
    },
    usuario: {
        /*
            Un SchemaType dice qué tipo debe tener una ruta determinada,
            si tiene captadores / establecedores y qué valores son 
            válidos para esa ruta.
        */
        //Tiene que ser un objetId
        //Un ObjectId es un tipo BSON binario de 12 bytes representado en 24 caracteres hexadecimales (_id)
        type: Schema.Types.ObjectId,
        //El esquema de referencia a la que debe de asociarse nuestro ObjectId
        ref: 'Usuario',
        require: true
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }
});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Producto', ProductoSchema);