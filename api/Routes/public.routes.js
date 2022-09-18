const router = require('express').Router();
const authController = require('../Controllers/auth.controller');

// Authentication
/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: Nombre del usuario
 *              password:
 *                  type: string
 *                  description: Contraseña del usuario
 *          required:
 *              - username
 *              - password
 *          example:
 *              username: juanperez
 *              password: '123'
 *      Logout:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 *                  description: Token generado al iniciar sesión
 *          required:
 *              - token
 *          example:
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2NjA0MzI3OTcsImV4cCI6MTY2MDQzNjM5N30.rIgZ2CESX2ldSQjDChLFNeFmXdyC5Zfb-Kv5AjGAmwo
 */

/**
 * @swagger
 * /public/login:
 *  post:
 *      summary: Iniciar sesión
 *      tags: [Public]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: Login exitoso!
 *          500:
 *              description: Hubo un error interno.
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /public/logout:
 *  post:
 *      summary: Cerrar sesión
 *      tags: [Public]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Logout'
 *      responses:
 *          200:
 *              description: Sesión terminada.
 *          500:
 *              description: Hubo un error interno.
 */
router.post('/logout', authController.logout);

module.exports = router;