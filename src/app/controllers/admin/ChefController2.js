const Chef = require('../../models/Chef');
const File = require('../../models/File');

module.exports = {
  async index(req,res) {

    let results = await Chef.all();
    
    if(!results) return res.send('Chefs not found!');

    const chefs = results.rows;

    chefs.forEach(chef => {
      chef.avatar = `${req.protocol}://${req.headers.host}${chef.avatar.replace("public", "")}`;
    })

    return res.render('admin/chefs/index', { chefs });
    
  },
  create(req,res) {
    return res.render('admin/chefs/create');
  },

  async post(req, res) {
    const keys = Object.keys(req.body);

    keys.forEach(key => {
      if(req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    });

    if (req.files.length == 0) {
      return res.send('Please, send at least one file.')
    }

    const file = req.files[0];

    let result = await File.create(file);

    const fileId = result.rows[0].id;

    result = await Chef.create(req.body, fileId);

    const chef = result.rows[0];

    return res.redirect(`/admin/chefs/${chef.id}`);

  },

  async show(req, res) {
    let results =  await Chef.find(req.params.id);

    if(!results.rows.length) {
      results = await Chef.all();

      const chefs = results.rows;
      const error = 'Este chef não está cadastrado'

      chefs.forEach(chef => {
        chef.avatar = `${req.protocol}://${req.headers.host}${chef.avatar.replace("public", "")}`;
      })

      return res.render('admin/chefs/index', { chefs, error });
    }
    const chef = results.rows[0];
    chef.total_recipes = 0;
    chef.avatar = `${req.protocol}://${req.headers.host}${chef.avatar.replace("public", "")}`;

    if(chef.recipe_id != null) {
      const recipes = results.rows.map(chef => {
        return chef.recipe_id
      });
      chef.recipes = [];
      const recipesPromise = recipes.map(async recipe => {
        results = await File.find(recipe);
        results = results.rows[0];
        results.path = `${req.protocol}://${req.headers.host}${results.path.replace("public", "")}`
        chef.recipes.push(results);
      })
      await Promise.all(recipesPromise);
      chef.total_recipes = chef.recipes.length;
    }
    delete chef.recipe_id;
  
    return res.render(`admin/chefs/show`, {chef});
  },

  async put(req, res) {
    const keys = Object.keys(req.body);

    keys.forEach(key => {
      if(req.body[key] == "" && key != "removed_files") {
        return res.send("Please, fill all fields");
      }
    });
    
    if(req.files != 0) {
      const file = req.files[0];
      const result = await File.create(file);
      req.body.fileId = result.rows[0].id;
    }
    
    await Chef.update(req.body);

    if(req.body.removed_files) {
      const removedFile = req.body.removed_files.split(',')[0];
      await File.delete(removedFile);
    }
    
    return res.redirect(`/admin/chefs/${req.body.id}`);

  },

  async edit(req, res) {
    let result = await Chef.find(req.params.id);
    const chef = result.rows[0];
    chef.avatar =  `${req.protocol}://${req.headers.host}${chef.avatar.replace("public", "")}`;
    return res.render(`admin/chefs/edit`, { chef });
  },

  async delete(req, res) {
    let results = await Chef.find(req.body.id);

    if (results.rows[0].recipe_id)
      return res.send("Possui receita, não pode ser apagado")
 
    Chef.delete(req.body);
    return res.redirect('/admin/chefs');
  }
}