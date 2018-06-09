"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const { Pool } = require('pg');
var pg = require("pg");
var dotenv = require("dotenv");
dotenv.config();
// postgres connection config
var config = {
    host: process.env.DBHOST,
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: 'atlas',
    port: 5432,
    ssl: true
};
var pool = new pg.Pool(config);
pool.connect(function (err, client, done) {
    if (err) {
        console.log("not able to get connection " + err);
    }
});
function query(text, params, callback) {
    return pool.query(text, params, callback);
}
exports.query = query;
/*module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}*/
//# sourceMappingURL=index.js.map