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

const badRequestError = (res, error) =>{
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status:  HTTP_STATUS.BAD_REQUEST,
        message: 'Faltan datos en la consulta realizada.',
        cause:   error
    });
}

const invalidTokenError = (res, error) =>{
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status:  HTTP_STATUS.BAD_REQUEST,
        message: 'Token inválido.',
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

const dataNotFound = (res, object) =>{
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status:  HTTP_STATUS.BAD_REQUEST,
        message: `${object} no encontrado/a.`,
        data: null
    });
}

const dataNotAllowed = (res, field) =>{
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status:  HTTP_STATUS.BAD_REQUEST,
        message: `Debes ingresar un dato válido para el campo: ${field}.`,
        data: null
    });
}

const dataAlreadyExists = (res, entity, field, value) =>{
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status:  HTTP_STATUS.BAD_REQUEST,
        message: `Ya existe un/a ${entity} registrado con: ${field} = ${value}.`,
        data: null
    });
}

const actionNotAllowed = (res, extra) =>{
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status:  HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: `Acción no permitida para el usuario.`,
        data: extra
    });
}

module.exports = {
    invalidLoginCredentialsError,
    recordCreationError,
    internalServerError,
    badRequestError,
    invalidTokenError,
    transactionExecutedSuccessfully,
    dataNotFound,
    dataNotAllowed,
    dataAlreadyExists,
    actionNotAllowed
}