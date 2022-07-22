const { HTTP_STATUS } = require("../Utils/commons");

const invalidLoginCredentialsError = (res) =>{
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status:  HTTP_STATUS.BAD_REQUEST,
        message: 'Las credenciales de acceso ingresadas son incorrectas'
    });
}

const recordCreationError = (res, objet_name) =>{
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status:  HTTP_STATUS.BAD_REQUEST,
        message: `Hubo un error al intentar crear un/a: ${objet_name}`
    });
}

const internalServerError = (res, error) =>{
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status:  HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: 'Hubo un error interno en el servidor.',
        cause:   error
    });
}

const transactionExecutedSuccessfully = (res, data) =>{
    return res.status(HTTP_STATUS.OK).json({
        status:  HTTP_STATUS.OK,
        message: 'Transacción ejecutada correctamente.',
        data
    });
}

module.exports = {
    invalidLoginCredentialsError,
    recordCreationError,
    internalServerError,
    transactionExecutedSuccessfully
}