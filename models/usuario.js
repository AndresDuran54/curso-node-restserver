const {Schema, model } = require('mongoose');
/*
Todo en Mongoose comienza con un esquema. Cada esquema se 
asigna a una colección de MongoDB y define la forma de los 
documentos dentro de esa colección.
*/

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
    },
    correo:{
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
        //Matriz, crea un validador que verifica si el valor está en la matriz dada
        emun: ['ADMIN_ROLE', 'SUPER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

/*
Para usar nuestra definición de esquema, necesitamos convertir nuestro blogSchema 
en un Modelo con el que podamos trabajar. Para hacerlo, lo pasamos a mongoose.model
*/
module.exports = model('Usuario', UsuarioSchema);