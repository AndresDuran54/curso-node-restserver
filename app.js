//Carga las variables de entorno de nuestro archivo .env
require('dotenv').config();

const Server = require('./models/server');

//Creamos una instacia de servidor
const server = new Server();

//Corremos nuestro servidor
server.listen();