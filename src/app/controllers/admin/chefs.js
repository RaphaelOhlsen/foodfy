const Chef = require('../../models/Chef');

module.exports = {
  create(req,res) {
    return res.render('admin/chefs/create');
  },

  post(req, res) {
    const keys = Object.keys(req.body);
    keys.forEach(key => {
      if(req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    });

    Chef.create(req.body, function(chef) {
      return res.redirect(`/admin/chefs/${chef.id}`);
    })
  },

  show(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send("Chef not found!");

      return res.render(`admin/chefs/show`, { chef })
    })
  }
}