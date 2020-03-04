const express = require('express');
const routes = express.Router();
const adminRecipes = require('./controllers/recipes');

const recipes = require('./data');

// ************************
// ROTAS DO SITE
// ************************

routes.get('/', (req,res) => {
  return res.render('public/main', { recipes });
});

routes.get("/recipes", (req, res) => {
  return res.render("public/recipes", { recipes });
});

routes.get("/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const length = recipes.length;
  if (recipeIndex >= length) {
    return console.log('Recipe is not found')
  }
  const recipe = recipes[recipeIndex];
  return res.render("public/recipe", { recipe });
});

routes.get("/about", (req,res) => {
  return res.render("public/about");
});

// ************************
// ADMIN
// ************************

routes.get("/admin/recipes", adminRecipes.index);
routes.get("/admin", adminRecipes.index);
routes.get("/admin/recipes/create", adminRecipes.create);
routes.get("/admin/recipes/:id", adminRecipes.show);

routes.post('/admin/recipes', adminRecipes.post);


module.exports = routes;