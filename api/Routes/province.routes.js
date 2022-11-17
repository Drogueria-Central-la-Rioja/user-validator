const router = require('express').Router();
const provinceController = require('../Controllers/province.controller');

/**
 * @swagger
 * /provinces:
 *  get:
 *      summary: Obtener lista de provincias
 *      tags: [Province]
 *      responses:
 *          200:
 *              description: Lista de provincias.
 *          500:
 *              description: hubo un error interno.
 */
 router.get('/', provinceController.getProvinces);

 module.exports = router;