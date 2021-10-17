//Importamos express
const express = require('express');
var cors = require('cors');

//Obtenemos la función de configuración de conexion a nuestra BD
const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        //Obtenemos una instacia de expres
        this.app = express();
        //Obtenemos nuestro número de puerto
        this.port = process.env.PORT;
        //Declaramos un path para el CRUD usuarios
        this.usuariosPath = '/api/usuarios';
        //Declaramos un path para la autorización
        this.authPath = '/api/auth';

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
        //Declaramos los path con sus respectivas subrutas para cada tipo de petición
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        //Iniciamos el servidor
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo el puerto ", this.port);
        });
    }

}

module.exports = Server;