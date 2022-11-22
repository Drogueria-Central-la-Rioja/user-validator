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
 *              password:
 *                  type: string
 *          required:
 *              - username
 *              - password
 *      Logout:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 *                  description: token generated at login
 *          required:
 *              - token
 *          example:
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2NjA0MzI3OTcsImV4cCI6MTY2MDQzNjM5N30.rIgZ2CESX2ldSQjDChLFNeFmXdyC5Zfb-Kv5AjGAmwo
 */

/**
 * @swagger
 * /public/login:
 *  post:
 *      summary: login
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
 *              description: Login successfull
 *          500:
 *              description: internal server error.
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /public/logout:
 *  post:
 *      summary: logout
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
 *              description: session ended.
 *          500:
 *              description: internal server error.
 */
router.post('/logout', authController.logout);

module.exports = router;