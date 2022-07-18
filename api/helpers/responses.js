
const invalidLoginCredentialsError = (res) =>{
    return res.status(400).json({
        status:  'failed',
        message: 'Las credenciales de acceso ingresadas son incorrectas'
    });
}

const recordCreationError = (res, objet_name) =>{
    return res.status(400).json({
        status:  'failed',
        message: `Hubo un error al intentar crear un/a: ${objet_name}`
    });
}

const internalServerError = (res, error) =>{
    return res.status(400).json({
        status:  'failed',
        message: 'Hubo un error interno en el servidor.',
        cause:   error
    });
}

const transactionExecutedSuccessfully = (res, data) =>{
    return res.status(200).json({
        status:  'ok',
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