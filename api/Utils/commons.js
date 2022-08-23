const HTTP_STATUS = {
    OK:                    200,
    BAD_REQUEST:           400,
    INTERNAL_SERVER_ERROR: 500
}

const USER_STATUS = {
    ACTIVO:     'ACTIVO',
    PENDIENTE:  'PENDIENTE',
    SUSPENDIDO: 'SUSPENDIDO',
    ELIMINADO:  'ELIMINADO'
}

module.exports = {
    HTTP_STATUS,
    USER_STATUS
}