const router = require('express').Router();
const { validateJWT } = require("../middlewares/validateJWT");
const userController = require('../Controllers/userController');


// Users Management 
/**
 * @swagger
 * components:
 *  schemas:
 *      DatosPersonales:
 *          type: object
 *          properties:
 *              nombres:
 *                  type: string
 *              apellidos:
 *                  type: string
 *              dni:
 *                  type: string
 *              email:
 *                  type: string
 *              telefono:
 *                  type: string
 *                  description: Telefono personal.
 *              domicilio_completo:
 *                  type: string
 *                  description: Dirección del domicilio actual.
 *          required:
 *              - nombres
 *              - apellidos
 *              - dni
 *              - email
 *          example:
 *              nombres: Juan
 *              apellidos: Perez
 *              dni: 39992342
 *              email: juancito@gmail.com
 *      User:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: Nombre del usuario
 *              password:
 *                  type: string
 *                  description: Contraseña del usuario
 *              dependencia_id:
 *                  type: integer
 *                  description: ID de Dependencia del usuario
 *          required:
 *              - username
 *              - password
 *              - dependencia_id
 *          example:
 *              username: juanperez
 *              password: 123
 *              dependencia_id: 1
 *      UpdateUser:
 *          type: object
 *          properties:
 *              dependencia_id:
 *                  type: integer
 *                  description: ID de Dependencia del usuario
 *              estado:
 *                  type: string
 *                  description: Estado de la cuenta
 *              datosPersonales:
*                   $ref: '#/components/schemas/DatosPersonales'
 *          required:
 *              - dependencia_id
 *              - estado
 *              - datosPersonales
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Obtener lista de usuarios
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Lista de usuarios.
 *          500:
 *              description: hubo un error interno.
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /users/{user_id}:
 *  get:
 *      summary: Obtener información de un usuario
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: user_id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: Información obtenida correctamente.
 *          500:
 *              description: Hubo un error interno.
 */
router.get('/:user_id', userController.getUserInfo);

/**
 * @swagger
 * /users:
 *  post:
 *      summary: Crear un nuevo usuario
 *      tags: [User]
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
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Nuevo usuario creado.
 *          500:
 *              description: Hubo un error interno.
 */
router.post('/', validateJWT, userController.createUser);

/**
 * @swagger
 * /users/{user_id}:
 *  patch:
 *      summary: Actualizar datos de un usuario
 *      tags: [User]
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
 *                      $ref: '#/components/schemas/UpdateUser'
 *      responses:
 *          200:
 *              description: Usuario actualizado correctamente.
 *          500:
 *              description: Hubo un error interno.
 */
router.patch('/:user_id', validateJWT, userController.updateUserData);

/**
 * @swagger
 * /users/{user_id}:
 *  delete:
 *      summary: Eliminar un usuario
 *      tags: [User]
 *      parameters:
 *          - in: header
 *            name: x-token
 *            schema:
 *              type: string
 *            required: true
 *          - in: path
 *            name: user_id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: Usuario actualizado correctamente.
 *          500:
 *              description: Hubo un error interno.
 */
router.delete('/:user_id', validateJWT, userController.deleteUser);

module.exports = router;