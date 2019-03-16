/**
 * DataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


 module.exports = {


  getOneToOneMatch: function(req, res) {
   
    DataService.getOneToOneMatch(req.allParams(), function(err, result) {
      if(err) { return res.serverError(err); }
      return res.ok(result);
    });
  },

  getCpData: function(req, res) {
   
    DataService.getCpData(req.allParams(), function(err, result) {
      if(err) { return res.serverError(err); }
      return res.ok(result);
    });
  },

  getSgData: function(req, res) {
   
    DataService.getSgData(req.allParams(), function(err, result) {
      if(err) { return res.serverError(err); }
      return res.ok(result);
    });
  },

};

