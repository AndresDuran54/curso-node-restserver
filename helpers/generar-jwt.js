const jwt = require('jsonwebtoken');

const generarJWT = ( uid = "") => {
    return new Promise((resolve, reject) => {

        const payload = { uid };
    
        //Firmamos el token
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            //Expira en 4 horas
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = generarJWT;