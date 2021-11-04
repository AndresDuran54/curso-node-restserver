//Importamos express
const express = require('express');
var cors = require('cors');

//Obtenemos la función de configuración de conexion a nuestra BD
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        //Obtenemos una instacia de expres
        this.app = express();
        
        //Obtenemos nuestro número de puerto
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }

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

        //Fileupload - Cargar Archivos
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                //Crear carpeta si es necesario
                createParentPath: true
            })
        );

    }

    routes(){
        //Declaramos los path con sus respectivas subrutas para cada tipo de petición
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen(){
        //Iniciamos el servidor
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo el puerto ", this.port);
        });
    }

}

module.exports = Server;