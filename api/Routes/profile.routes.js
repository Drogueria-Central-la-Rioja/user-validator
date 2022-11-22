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
 *                  description: by default active
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
 * /profiles:
 *  get:
 *      summary: get list of profiles
 *      tags: [Profile]
 *      responses:
 *          200:
 *              description: profile list.
 *          500:
 *              description: internal server error.
 */
 router.get('/', perfilController.getProfiles);

/**
 * @swagger
 * /profiles/create:
 *  post:
 *      summary: create new profile
 *      tags: [Profile]
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
 *              description: transaction executed successfully.
 *          500:
 *              description: internal server error.
 */
 router.post('/create', validateJWT, perfilController.createProfile);

/**
 * @swagger
 * /profiles/bind-user:
 *  post:
 *      summary: add a profile to a user
 *      tags: [Profile]
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
 *              description: assigned profile.
 *          500:
 *              description: internal server error.
 */
 router.post('/bind-user', validateJWT, perfilController.addUserProfile);

 module.exports = router;