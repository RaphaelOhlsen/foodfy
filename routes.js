const express = require('express');
const routes = express.Router();
const adminRecipes = require('./controllers/recipes')

const recipes = require('./data');

// ************************
// ROTAS DO SITE
// ************************

routes.get('/', (req,res) => {
  return res.render('main', { recipes });
});

routes.get("/recipes", (req, res) => {
  return res.render("recipes", { recipes });
});

routes.get("/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const length = recipes.length;
  if (recipeIndex >= length) {
    return console.log('Recipe is not found')
  }
  const recipe = recipes[recipeIndex];
  return res.render("recipe", { recipe });
});

routes.get("/about", (req,res) => {
  return res.render("about");
});

// ************************
// ADMIN
// ************************

routes.get("/admin/recipes", adminRecipes.index);
routes.get("/admin", adminRecipes.index);

module.exports = routes;