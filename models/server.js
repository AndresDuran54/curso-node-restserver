const express = require('express');
var cors = require('cors');

const { dbConnection } = require('../database/config')

const app = express();

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a la base da datos
        this.conectarDb();

        //Middlewares -> funciónes que añaden funcionalidades a nuestro RestServer, que se
        //ejecutan cuando levantamos el servidor
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();
    }

    async conectarDb(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Directorio público
        this.app.use( express.static('public') );

        //La informacion que viene hacia el backend va a estar en formato de tipo JSON
        //Parsea el body en formato JSON
        this.app.use(express.json());

    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo el puerto ", this.port);
        });
    }

}

module.exports = Server;