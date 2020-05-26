const Recipes = require('../../models/Recipe');
const File = require('../../models/File');

module.exports = {
  
  async main(req,res) {
    let recipes = await Recipes.popular();
    recipes = recipes.rows;
    
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


    return res.render('public/main', { recipes });
  },

  async index(req,res) {
    let { search } = req.query; 
    let recipes = await Recipes.search(search);

    if(!recipes) return res.send('Products not found!');
    recipes = recipes.rows;

    async function getImage(recipeId) {
      let results = await File.find(recipeId);
      const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
      return files[0];
    }

    const recipesPromise = recipes.map(async recipe => {
      recipe.image = await getImage(recipe.id);
    });

    await Promise.all(recipesPromise);
    
    return res.render('public/recipes/index', { recipes, search });
  },

  async show(req,res) {
    const { id } = req.params;
    let recipe = await Recipes.find(id);
    recipe = recipe.rows[0];
    if(!recipe) return res.send('Recipe not found!');

    async function getImage(recipeId) {
      let results = await File.find(recipeId);
      const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
      return files[0];
    }

    recipe.image = await getImage(recipe.id);

    return res.render('public/recipes/show', { recipe });
    
  },

  about(req,res) {
    return res.render('public/about')
  }

}