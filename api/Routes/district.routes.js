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
 * /districts:
 *  get:
 *      summary: Obtener lista de distritos
 *      tags: [District]
 *      parameters:
 *          - in: query
 *            name: provincia_id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: Lista de distritos.
 *          500:
 *              description: hubo un error interno.
 */
 router.get('/', districtController.getDistrictsByProvinceId);

 /**
 * @swagger
 * /districts/create:
 *  post:
 *      summary: Crear un nuevo departamento
 *      tags: [District]
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
 *              description: Creado correctamente.
 *          500:
 *              description: Hubo un error interno.
 */
  router.post('/create', validateJWT, districtController.createDistrict);

 module.exports = router;