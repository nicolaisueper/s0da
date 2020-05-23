const ora = require('ora');
const pgpr = require('pg-promise')()
const buildConnectionString = require("./utils.js").buildConnectionString;
const config = require('../config.json')
const db = pgpr(buildConnectionString(config.dbuser, config.dbpass, config.dbhost, config.dbport, config.dbname))

const spinner = ora({
    text: 'Initializing...',
    spinner: 'dots8Bit'
}).start();

function createSchema() {
    spinner.text = 'Creating schema...';
    return db.none('CREATE SCHEMA s0da;')
        .catch(e2 => {
            spinner.stop();
            console.error("Error! Unable to create schema!", e2)
            return Promise.reject(e2)
        });
}

function createTableSettings() {
    spinner.text = 'Creating table "settings"...';
    return db.none('CREATE TABLE s0da.settings(\n' +
        'ID INT NOT NULL,' +
        'KEY VARCHAR (32) NOT NULL,' +
        'VALUE VARCHAR (32) NOT NULL,' +
        'PRIMARY KEY (ID)' +
        ');')
        .catch(e2 => {
            spinner.stop();
            console.error("Error! Unable to create table 'settings'!", e2)
            return Promise.reject(e2)
        });
}

function createTableIncidents() {
    spinner.text = 'Creating table "incidents"...';
    return db.none('CREATE TABLE s0da.incidents(' +
        'ID INT NOT NULL,' +
        'DATE VARCHAR (16) NOT NULL,' +
        'STATUS VARCHAR (8) NOT NULL,' +
        'TITLE VARCHAR (64) NOT NULL,' +
        'DESCRIPTION TEXT NOT NULL,' +
        'PRIMARY KEY (ID)' +
        ');')
        .catch(e2 => {
            spinner.stop();
            console.error("Error! Unable to create table 'settings'!", e2)
            return Promise.reject(e2)
        });
}

spinner.text = 'Checking if database exists...';
db.any('SELECT 1 from pg_database WHERE datname=$1;', [config.dbname])
    .then(function (data) {
        createSchema().then(() => {
            createTableSettings().then(() => {
                createTableIncidents().then(() => {
                    spinner.stop();
                    console.log("Done!");
                    process.exit(0)
                }).catch(e => {
                    spinner.stop();
                    console.error("Error!", e);
                    process.exit(1)
                })
            })
        })
    })
    .catch(function (error) {
        spinner.stop();
        if (error.code === '3D000' /*database doesn't exist*/) {
            console.error("Error! Database does not exist!");
        } else {
            console.error(error);
        }
    });

