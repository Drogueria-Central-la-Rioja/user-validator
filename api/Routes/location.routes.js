const router = require('express').Router();
const locationController = require('../Controllers/location.controller');
const { validateJWT } = require("../middlewares/validateJWT");

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateLocation:
 *          type: object
 *          properties:
 *              departamento_id:
 *                  type: integer
 *              nombre:
 *                  type: string
 *              descripcion:
 *                  type: string
 *          required:
 *              - departamento_id
 *              - nombre
 */

/**
 * @swagger
 * /locations/{district_id}:
 *  get:
 *      summary: get list of locations by district
 *      tags: [Residence]
 *      parameters:
 *          - in: path
 *            name: district_id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: transaction executed successfully.
 *          500:
 *              description: internal server error.
 */
 router.get('/:district_id', locationController.getLocationsByDistrictId);

  /**
 * @swagger
 * /locations/create:
 *  post:
 *      summary: create new location
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
 *                      $ref: '#/components/schemas/CreateLocation'
 *      responses:
 *          200:
 *              description: transaction executed successfully.
 *          500:
 *              description: internal server error.
 */
   router.post('/create', validateJWT, locationController.createLocation);

 module.exports = router;