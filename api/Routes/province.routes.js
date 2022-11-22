const router = require('express').Router();
const provinceController = require('../Controllers/province.controller');

/**
 * @swagger
 * /provinces:
 *  get:
 *      summary: list of provinces
 *      tags: [Residence]
 *      responses:
 *          200:
 *              description: transaction executed successfully.
 *          500:
 *              description: internal server error.
 */
 router.get('/', provinceController.getProvinces);

 module.exports = router;