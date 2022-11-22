const router = require('express').Router();
const districtController = require('../Controllers/district.controller');
const { validateJWT } = require("../middlewares/validateJWT");

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateDistrict:
 *          type: object
 *          properties:
 *              provincia_id:
 *                  type: integer
 *              nombre:
 *                  type: string
 *              descripcion:
 *                  type: string
 *          required:
 *              - provincia_id
 *              - nombre
 */

/**
 * @swagger
 * /districts/{province_id}:
 *  get:
 *      summary: get list of district by province
 *      tags: [Residence]
 *      parameters:
 *          - in: path
 *            name: province_id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: transaction executed successfully.
 *          500:
 *              description: internal server error.
 */
 router.get('/:province_id', districtController.getDistrictsByProvinceId);

 /**
 * @swagger
 * /districts/create:
 *  post:
 *      summary: create a new district
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
 *                      $ref: '#/components/schemas/CreateDistrict'
 *      responses:
 *          200:
 *              description: transaction executed successfully.
 *          500:
 *              description: internal server error.
 */
  router.post('/create', validateJWT, districtController.createDistrict);

 module.exports = router;