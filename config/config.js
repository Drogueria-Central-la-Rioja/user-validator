
const dotenv = require('dotenv').config();

module.exports = {
    NODE_ENV: process.env.NODE_ENV    || 'development',
    HOST:     process.env.HOST_SERVER || '127.0.0.1',
    PORT:     process.env.PORT_SERVER || 5000
}
