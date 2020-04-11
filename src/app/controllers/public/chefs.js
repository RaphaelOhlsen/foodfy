const Chefs = require('../../models/Chef');

module.exports = {
  
  index(req,res) {
    Chefs.all( chefs => {
      return res.render('public/chefs/index', { chefs });
    })
  },

 

}