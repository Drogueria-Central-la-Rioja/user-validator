const router = require('express').Router();
const { validateJWT } = require("../middlewares/validateJWT");
const userController = require('../Controllers/user.controller');

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
 *              domicilio_completo:
 *                  type: string
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
 *              password:
 *                  type: string
 *              dependencia_id:
 *                  type: integer
 *          required:
 *              - username
 *              - password
 *              - dependencia_id
 *          example:
 *              username: juanperez
 *              password: 123
 *              dependencia_id: 1
 *      NewUser:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              password:
 *                  type: string
 *              dependencia_id:
 *                  type: integer
 *              datosPersonales:
 *                   $ref: '#/components/schemas/DatosPersonales'
 *          required:
 *              - username
 *              - password
 *              - dependencia_id
 *              - dni
 *      UpdateUser:
 *          type: object
 *          properties:
 *              dependencia_id:
 *                  type: integer
 *              estado:
 *                  type: string
 *              datosPersonales:
 *                   $ref: '#/components/schemas/DatosPersonales'
 *          required:
 *              - dependencia_id
 *              - estado
 *              - datosPersonales
 *      ChangeStatusUser:
 *          type: object
 *          properties:
 *              nuevo_estado:
 *                  type: string
 *          required:
 *              - nuevo_estado
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: get list of users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: user list.
 *          500:
 *              description: internal server error.
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /users/{user_id}:
 *  get:
 *      summary: get user information
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: user_id
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: transaction executed successfully.
 *          500:
 *              description: internal server error.
 */
router.get('/:user_id', userController.getUserInfo);

/**
 * @swagger
 * /users:
 *  post:
 *      summary: create new user
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
 *                      $ref: '#/components/schemas/NewUser'
 *      responses:
 *          200:
 *              description: user created successfully.
 *          500:
 *              description: internal server error.
 */
router.post('/', validateJWT, userController.createUser);

/**
 * @swagger
 * /users/{user_id}:
 *  patch:
 *      summary: update user data
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
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/UpdateUser'
 *      responses:
 *          200:
 *              description: user updated successfully.
 *          500:
 *              description: internal server error.
 */
router.patch('/:user_id', validateJWT, userController.updateUserData);

/**
 * @swagger
 * /users/{user_id}/change-status:
 *  patch:
 *      summary: change user status
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
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/ChangeStatusUser'
 *      responses:
 *          200:
 *              description: status change successfully.
 *          500:
 *              description: internal server error.
 */
 router.patch('/:user_id/change-status', validateJWT, userController.changeStatusUser);

/**
 * @swagger
 * /users/{user_id}:
 *  delete:
 *      summary: delete user
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
 *              description: user deleted successfully.
 *          500:
 *              description: internal server error.
 */
router.delete('/:user_id', validateJWT, userController.deleteUser);

module.exports = router;