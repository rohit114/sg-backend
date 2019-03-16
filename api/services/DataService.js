var express = require('express');
var async = require('async');
var _ = require('lodash');
var fs = require('fs');
const path = require('path');

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

     var cpSideInput = path.resolve(sails.config.clientData["cpSide"]);
     var sgSideInput = path.resolve(sails.config.clientData["sgSide"]);
     cpSideInput = cpSideInput+"/1_message.txt";

     console.log("location",cpSideInput);
     fs.readFile(cpSideInput, function(err, buf) {

        console.log(buf.toString());
        
      });

    /* fs.readdir(cpSideInput, (err, files) => {
      console.log(" cpSideInput location:"+JSON.stringify(cpSideInput));
      console.log(" sgSideInput location:"+JSON.stringify(sgSideInput));
      console.log("file:"+JSON.stringify(files));

      fs.readFile(files, function(err, buf) {

        console.log(buf.toString());
        console.log("**********************");
      });

     /* async.each(files,function(file, callback) {


      }, function(err) {


      });

    });
*/
     
     
     return done(null, mt300Object);

   },
    ], function(err, results){
      if(err){
        return callback(err);
      }
      return callback(null, results);
  });
}

