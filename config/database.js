require('dotenv').config();

const development = {
    username: process.env.DEV_DB_USERNAME || "root",
    password: process.env.DEV_DB_PASSWORD || "",
    database: process.env.DEV_DB_DATABASE || "user_validator",
    host:     process.env.DEV_DB_HOST     || "localhost",
    dialect:  process.env.DEV_DB_DIALECT  || "mysql",

    // Save seeds in a database table. This is to not repeat data
    seederStorage: "sequelize", 
    seederStorageTableName: "seeders",
  
    // Config migrations:
    migrationStorage: "sequelize",
    migrationStorageTableName: "migrations",
}

const production = {
  username: process.env.PROD_DB_USERNAME || "root",
  password: process.env.PROD_DB_PASSWORD || "",
  database: process.env.PROD_DB_DATABASE || "user_validator",
  host:     process.env.PROD_DB_HOST     || "localhost",
  dialect:  process.env.PROD_DB_DIALECT  || "mysql",

  // Save seeds in a database table. This is to not repeat data
  seederStorage: "sequelize", 
  seederStorageTableName: "seeders",

  // Config migrations:
  migrationStorage: "sequelize",
  migrationStorageTableName: "migrations",
}

module.exports = {
  development,
  production
}