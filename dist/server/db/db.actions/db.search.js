"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("../../server");
var DBSearch = /** @class */ (function () {
    function DBSearch() {
    }
    DBSearch.prototype.getRegions = function (callback) {
        console.log('querying database for regions');
        server_1.default.db.query('SELECT region_name FROM world.region limit $1', ['10'], function (err, result) {
            if (err) {
                console.log(err);
                return callback(err);
            }
            return callback(null, result);
        });
    };
    return DBSearch;
}());
exports.DBSearch = DBSearch;
//# sourceMappingURL=db.search.js.map