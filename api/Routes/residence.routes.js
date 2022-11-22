const router = require('express').Router();
const residenceController = require('../Controllers/residence.controller');
const { validateJWT } = require("../middlewares/validateJWT");

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateResidence:
 *          type: object
 *          properties:
 *              descripcion:
 *                  type: string
 *              direccion_completa:
 *                  type: string
 *              localidad_id:
 *                  type: integer
 *          required:
 *              - localidad_id
 *              - direccion_completa
 */

  /**
 * @swagger
 * /residences/create:
 *  post:
 *      summary: create new residence
 *      tags: [Residence]
 *      parameters:
 *          - in: header
 *            name: x-token
 *            schema:
 *              type: string
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/CreateResidence'
 *      responses:
 *          200:
 *              description: transaction executed successfully.
 *          500:
 *              description: internal server error.
 */
   router.post('/create', validateJWT, residenceController.createResidence);

 module.exports = router;