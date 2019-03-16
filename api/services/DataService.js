var express = require('express');
var async = require('async');
var _ = require('lodash');
var fs = require('fs');
const path = require('path');
var processFiles = require('process-files');
var cpData = {};
var sgData = {};
var  parsedData = {};

module.exports = {
  getOneToOneMatch: getOneToOneMatch,
};

function getOneToOneMatch(options, callback) {

  async.waterfall([
    function(done){
      var query = `SELECT * from mt300 where "isPartingOfMatching" = true`;
      RawPsqlService.queryOnM1(query , [] , function(err, mt300Object){
        if(err){ return done(err)}
         done(null, mt300Object);
     });
    },
    function(mt300Object, done){

     var cpSideInputPath = path.resolve(sails.config.clientData["cpSide"]);
     var sgSideInputPath = path.resolve(sails.config.clientData["sgSide"]);
    
     

//********* STARTS: RUN for one time just to parse the data and put into database **************//
     //reading and parsing input data from CP side
 /* 
     fs.readdir(cpSideInputPath, (err, files) => {

      async.each(files, function(eachfile, _done){
        var tempObj = {}
        var tempArray = [];
        var file  = cpSideInputPath+"/"+eachfile;
        fs.readFile(file, 'utf8', function(err, data) {  
          if (err) throw err;
          const lines = data.split('\n')
          for(var i=0 ; i<lines.length ; i++){
            var temp = lines[i].split(":");

            if(temp.length>2){
              tempObj[":"+temp[1]] = temp[2];
            }
            console.log(tempObj);
          }

          sgData[eachfile] = tempObj;
          parsedData = JSON.parse(JSON.stringify(sgData));
          console.log(parsedData);
          const query  = `INSERT into cpdata("message","dataobj") values($1,$2)`
          RawPsqlService.queryOnM1(query , [eachfile,tempObj] , function(err, cpdataObject){
            if(err){ return _done(err)}
            
         });
        });

        return _done(null);
      }, function(err, cpData){
        if(err) { return done(err); }
        
        return done( null, mt300Object);

      });


     });
   */  
//********* ENDS: RUN for one time just to parse the data and put into database **************//

   /*  
     fs.readdir(cpSideInputPath, (err, files) => {

      files.forEach( function( eachfile ){
        var tempObj = {}
        var tempArray = [];
        var file  = cpSideInputPath+"/"+eachfile;
        fs.readFile(file, 'utf8', function(err, data) {  
          if (err) throw err;
          const lines = data.split('\n')
          for(var i=0 ; i<lines.length ; i++){
            var temp = lines[i].split(":");

            if(temp.length>2){
              tempObj[":"+temp[1]] = temp[2];
            }
          }
          
          cpData[eachfile] = tempObj;
          parsedData = JSON.parse(JSON.stringify(cpData));
          console.log(parsedData);
        });

      });

    });
    
    */

     /*************** reading and parsing input data from SG side
     fs.readdir(sgSideInputPath, (err, files) => {

      files.forEach( function( eachfile ){
        var tempObj = {}
        var tempArray = [];
        var file  = sgSideInputPath+"/"+eachfile;
        fs.readFile(file, 'utf8', function(err, data) {  
          if (err) throw err;
          const lines = data.split('\n')
          for(var i=0 ; i<lines.length ; i++){
            var temp = lines[i].split(":");

            if(temp.length>2){
              tempObj[":"+temp[1]] = temp[2];
            }
          }
          
          sgData[eachfile] = tempObj;
          console.log(sgData);
        });

      });

    });
    ********/
     //return done(null, mt300Object, parsedData);

     return done( null, mt300Object);
   },
   function(mt300Object, done){

    var cpdataMessage = options.message;

    var query = `SELECT message from sgdata`;
      RawPsqlService.queryOnM1(query , [] , function(err, messageObject){
        if(err){ return done(err)}
         done(null, mt300Object, messageObject);
     });
     
     
  },
  function(mt300Object, message, done){
   
   var final = {};
   var sgObjectArry = [];
   async.each( message, function(eachMessage, _done) {
   const query = `SELECT * FROM sgdata where message=$1`;

    RawPsqlService.queryOnM1(query , [eachMessage.message] , function(err, sgObject){
      if(err){ return done(err)}
      sgObjectArry.push(sgObject[0]);

      final.sgObj = sgObjectArry;
      return _done(null);
    });

  },
  function(err){
    if(err) { return done(err); }
    final.mt300 = mt300Object;
    final.message = message;
    return done(null, final);
  });
  },
  function(final, done){
    var cpObjectArry = [];
    async.each( final.message, function(eachMessage, _done) {
      const query = `SELECT * FROM cpdata where message=$1`;

      RawPsqlService.queryOnM1(query , [eachMessage.message] , function(err, cpObject){
        if(err){ return done(err)}
          cpObjectArry.push(cpObject[0]);

        final.cpObj = cpObjectArry;
        return _done(null);
      });

    },
    function(err){
      if(err) { return done(err); }
      return done(null, final);
    });


  },
  function(final, done){
    var sgObj = final.sgObj;
    var cpObj = final.cpObj;
    var mt300 = final.mt300;
    var message  = final.message;
    message.forEach( function(eachMessage){
      console.log(eachMessage);
      cpObj.forEach( function( eachCP){
        if( eachCP.message === eachMessage.message){
          


        }

      });
      
       
    });

 return done(null, final);

  },
  ], function(err, results){
    if(err){
      return callback(err);
    }
    console.log()
    return callback(null, results);
  });
}

