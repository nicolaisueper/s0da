const pgpr = require('pg-promise')()
const buildConnectionString = require("./utils.js").buildConnectionString;
const config = require('../config.json')
const db = pgpr(buildConnectionString(config.dbuser, config.dbpass, config.dbhost, config.dbport, config.dbname))

