const mongoose = require('mongoose');

const dbConnection = async() => {
    try{

        //Nos conectamos a nuestra BD Mongo
        //process.env.MONGODB_CNN -> cadena de conexión
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Base de datos online");

    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}