const Chef = require('../../models/Chef');

module.exports = {
  index(req,res) {
    Chef.all( chefs => {
      return res.render('admin/chefs/index', { chefs });
    })
  },
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
      let total_recipes = chef.length;
      if(chef[0].title == null ) total_recipes = 0;
      const name = chef[0].name;
      const id = chef[0].id;
      const avatar_url = chef[0].avatar_url;
      return res.render(`admin/chefs/show`, 
        { recipes: chef, total_recipes, name, id, avatar_url }
      );
    })
  },

  put(req, res) {
    const keys = Object.keys(req.body);

    keys.forEach(key => {
      if(req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    });
    
    Chef.update(req.body, function() {
      return res.redirect(`/admin/chefs/${req.body.id}`);
    });
  },

  edit(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send('Chef not found!');
      const name = chef[0].name;
      const avatar_url = chef[0].avatar_url;
      const id = chef[0].id;
      return res.render(`admin/chefs/edit`, { name, avatar_url, id});
    })
  },

  delete(req, res) {
    Chef.delete(req.body.id, () => {
      return res.redirect('/admin/chefs');
    })
  }
}