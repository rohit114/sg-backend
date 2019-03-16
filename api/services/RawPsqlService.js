var pg = require('pg');
var Cursor = require('pg-cursor');
var async = require('async');
var debug = require('debug')('RawPsqlService');

var M1 = sails.config.myConnections.postgresM1;


module.exports = {

queryOnM1: function(query, params, callback) {
    pg.connect(M1, function(error, client, done) {
      if(error) {
        return callback(error);
      }
      client.query(query, params, function(err, result) {
        done();
        if(err) {
          sails.log.error('error running query', err, query);
          return callback(err);
        }
        if(result && result.rows.length > 0) {
          return callback(null, result.rows);
        } else {
          return callback(null, []);
        }
      });
    });
  },

};