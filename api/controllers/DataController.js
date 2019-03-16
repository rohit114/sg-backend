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

};

