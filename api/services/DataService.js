var express = require('express');
var async = require('async');
var _ = require('lodash');
var fs = require('fs');
const path = require('path');
//var LineByLineReader = require('line-by-line');

module.exports = {
  getOneToOneMatch: getOneToOneMatch,
};

function getOneToOneMatch(options, callback) {

  async.waterfall([
    function(done){
      var query = `SELECT * from mt300`;
      RawPsqlService.queryOnM1(query , [] , function(err, mt300Object){
        if(err){ return done(err)}
         done(null, mt300Object);
     });
    },
    function(mt300Object, done){

     var cpSideInputPath = path.resolve(sails.config.clientData["cpSide"]);
     var sgSideInputPath = path.resolve(sails.config.clientData["sgSide"]);
     fs.readdir(cpSideInputPath, (err, files) => {
      async.each(files,function(file, callback) {

       console.log(file);

     }, function(err) {

         callback();

    });

    });

     return done(null, mt300Object);
   },
   
   ], function(err, results){
    if(err){
      return callback(err);
    }
    return callback(null, results);
  });
}

