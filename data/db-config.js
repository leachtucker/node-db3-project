// Import knex
const knex = require('knex');

// Import knex config file
const config = require('../knexfile');

// Setup database by invoking knex with development settings in the config file.
const db = knex(config.development);

module.exports = db;