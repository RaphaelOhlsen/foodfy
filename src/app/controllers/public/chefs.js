const Chefs = require('../../models/Chef');

module.exports = {
  
  async index(req,res) {
    const results = await Chefs.all();
    const chefs = results.rows;
    chefs.forEach(chef => {
      chef.avatar = `${req.protocol}://${req.headers.host}${chef.avatar.replace("public", "")}`
    })
    return res.render('public/chefs/index', { chefs })
  },

 

}