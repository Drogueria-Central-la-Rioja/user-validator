const router = require('express').Router();
const dependenceController = require('../Controllers/dependence.controller');
const { validateJWT } = require("../middlewares/validateJWT");

/**
 * @swagger
 * components:
 *  schemas:
 *      CreateDependence:
 *          type: object
 *          properties:
 *              codigo:
 *                  type: string
 *              tipo:
 *                  type: string
 *              nombre_corto:
 *                  type: string
 *              nombre_oficial:
 *                  type: string
 *              efector_salud:
 *                  type: boolean
 *              codigo_sisa:
 *                  type: string
 *              cuit:
 *                  type: integer
 *              codigo_remediar:
 *                  type: string
 *              domicilio:
 *                   $ref: '#/components/schemas/CreateResidence'
 *              nivel_atencion_id:
 *                  type: integer
 *              tipologia:
 *                  type: string
 *          required:
 *              - codigo
 *              - tipo
 *              - nombre_oficial
 *              - efector_salud
 *              - codigo_sisa
 *              - cuit
 *              - codigo_remediar
 */

/**
 * @swagger
 * /dependencies/attention-levels:
 *  get:
 *      summary: get list of attention levels
 *      tags: [Dependence]
 *      responses:
 *          200:
 *              description: attention level list
 *          500:
 *              description: internal server error
 */
 router.get('/attention-levels', dependenceController.getAttentionLevels);

/**
 * @swagger
 * /dependencies:
 *  get:
 *      summary: get list of dependencies
 *      tags: [Dependence]
 *      responses:
 *          200:
 *              description: dependence list
 *          500:
 *              description: internal server error
 */
 router.get('/', dependenceController.getDependencies);

 /**
 * @swagger
 * /dependencies/create:
 *  post:
 *      summary: create a new dependence
 *      tags: [Dependence]
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
 *                      $ref: '#/components/schemas/CreateDependence'
 *      responses:
 *          200:
 *              description: transaction executed successfully.
 *          500:
 *              description: internal server error.
 */
  router.post('/create', validateJWT, dependenceController.createDependence);

 module.exports = router;