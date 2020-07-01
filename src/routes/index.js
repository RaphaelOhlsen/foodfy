const express = require('express');
const routes = express.Router();

const RecipeController = require('../app/controllers/public/RecipeController');
const ChefController = require('../app/controllers/public/ChefController')

const chefs = require('./chefs');
const recipes = require('./recipes');
const users = require('./users');
const profile = require('./profile');



// ************************
// PUBLIC
// ************************

routes.get("/", RecipeController.main);
routes.get("/recipes", RecipeController.index);
routes.get("/recipes/:id", RecipeController.show);
routes.get("/chefs",ChefController.index);
routes.get("/about", RecipeController.about);

// ************************
// ADMIN
// ************************

routes.use('/admin/chefs', chefs);
routes.use('/admin/recipes', recipes);
routes.use('/admin/users', users);
routes.use('/admin/profile', profile);

// Alias
routes.get("/admin", (req, res) => {
  return res.redirect('/admin/recipes');
})


module.exports = routes;