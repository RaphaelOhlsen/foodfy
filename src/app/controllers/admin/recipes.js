const Recipe = require('../../models/Recipe');
const File = require('../../models/File');

module.exports = {
  async index(req, res) {
    try {
      let results = await Recipe.all();
      let recipes = results.rows;

      if(!recipes) return res.send('Products not found!');

      async function getImage(recipeId) {
        let results = await File.find(recipeId);
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
        return files[0];
      }

      const recipesPromise = recipes.map(async recipe => {
        recipe.image = await getImage(recipe.id);
      });

      await Promise.all(recipesPromise);

      return res.render('admin/recipes/index', { recipes });
    }
    catch(err) {
      console.error(err)
    }
  },

  async create(req, res) {
    let chefOptions = await Recipe.chefSelectOptions();
    chefOptions = chefOptions.rows;
    if(!chefOptions.length) return res.send("Please, create a chef first")
    return res.render('admin/recipes/create', { chefOptions})
  },

  async post(req,res) {
    const keys = Object.keys(req.body);

    keys.forEach(key => {
      if(req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    });

    if (req.files.length == 0) {
      return res.send('Please, send at least one file.')
    }
  
    let results = await Recipe.create(req.body);
    const recipeId = results.rows[0].id;

    const filesPromisse = req.files.map(file =>
      File.create({
        ...file
      })
    );

    results = await Promise.all(filesPromisse);

    let filesId = results.map(result => {return result.rows[0].id});

    const recipeFilesPromisse = filesId.map(fileId => 
      Recipe.recipeFiles({
        fileId,
        recipeId
      })
    ); 

    await Promise.all(recipeFilesPromisse);

    
    return res.redirect(`recipes/${recipeId}`);
    
  },

  async show(req,res) {
    const { id } = req.params;
    let results = await Recipe.find(id);
    recipe = results.rows[0];
    results = await File.find(recipe.id);
    let files = results.rows;
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }));

    return res.render('admin/recipes/show', { recipe, files });
  },

  async edit(req,res) {
    let results = await Recipe.find(req.params.id);
    const recipe = results.rows[0];
    
    if(!recipe) return res.send('Recipes not found! ');

    results = await Recipe.chefSelectOptions();
    const chefOptions = results.rows;
    results = await File.find(recipe.id);
    let files = results.rows;
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }));

    return res.render("admin/recipes/edit", {recipe, chefOptions, files});
    
  },

  async put(req, res) {
    const keys = Object.keys(req.body);
    keys.forEach(key => {
      if(req.body[key] == "" && key != "removed_files") {
        return res.send("Please, fill all fields");
      }
    });

    if(req.files != 0) {
      const filesPromise = req.files.map(file =>
        File.create({
          ...file
        })
      );

      const results = await Promise.all(filesPromise);
      const filesId = results.map(result => { return result.rows[0].id});
      const recipeId = req.body.id;
      const recipeFilesPromise = filesId.map(fileId => 
        Recipe.recipeFiles({
          fileId,
          recipeId
        })
      ); 

      await Promise.all(recipeFilesPromise);
    }

    if(req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(',');
      removedFiles.pop();
      const removedFilesPromisse = removedFiles.map(async id => await File.delete(id));
      await Promise.all(removedFilesPromisse);
    }
    
    await Recipe.update(req.body);

    return res.redirect(`/admin/recipes/${req.body.id}`);
  },

  async delete(req,res) { 
    const removedFiles = await Recipe.delete(req.body.id);
    const removedFilesPromisse = removedFiles.map(id => File.delete(id));
    await Promise.all(removedFilesPromisse);
      
    return res.redirect('/admin/recipes');
  }

}