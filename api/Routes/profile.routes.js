const router = require('express').Router();
const perfilController = require('../Controllers/perfil.controller');
const { validateJWT } = require("../middlewares/validateJWT");

/**
 * @swagger
 * components:
 *  schemas:
 *      UserProfile:
 *          type: object
 *          properties:
 *              usuario_id:
 *                  type: integer
 *              perfil_id:
 *                  type: integer
 *              estado:
 *                  type: string
 *                  description: Estado del perfil asignado. Por defecto activo
 *          required:
 *              - usuario_id
 *              - perfil_id
 *      CreateProfile:
 *          type: object
 *          properties:
 *              nombre:
 *                  type: string
 *              descripcion:
 *                  type: string
 *          required:
 *              - nombre
 */
 
/**
 * @swagger
 * /profiles/create:
 *  post:
 *      summary: Crear un nuevo perfil
 *      tags: [Profiles]
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
 *                      $ref: '#/components/schemas/CreateProfile'
 *      responses:
 *          200:
 *              description: Creado correctamente.
 *          500:
 *              description: Hubo un error interno.
 */
 router.post('/create', validateJWT, perfilController.createProfile);

/**
 * @swagger
 * /profiles/bind-user:
 *  post:
 *      summary: Agregar un perfil a un usuario
 *      tags: [Profiles]
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
 *                      $ref: '#/components/schemas/UserProfile'
 *      responses:
 *          200:
 *              description: Perfil asignado.
 *          500:
 *              description: Hubo un error interno.
 */
 router.post('/bind-user', validateJWT, perfilController.addUserProfile);

 module.exports = router;