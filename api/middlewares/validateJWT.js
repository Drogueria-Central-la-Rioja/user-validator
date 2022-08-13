const { response } = require('express');
const { verifyJWT } = require('../helpers/jwt');
const { badRequestError, invalidTokenError } = require('../helpers/responses');
const { tokenExistsInBlacklist } = require('../Services/auth.service');

const validateJWT = async ( req, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ){
        return badRequestError(res, 'No se encontró en el header el campo: x-token');
    }

    try {
        if(await tokenExistsInBlacklist(token)){
            return invalidTokenError(res, 'El token enviado ya cerro sesión.');
        }

        const data = await verifyJWT(token);
        if(data != null){
            // Envio datos por la request al controlador
            req.uid = data.uid;
            req.usuario = data.name;
        }else{
            return invalidTokenError(res, 'No se pudo resolver el token enviado');
        }
        
    } catch (error) {
        return invalidTokenError(res, error);
    }

    //Todo OK:
    next();
}

module.exports = {
    validateJWT
}