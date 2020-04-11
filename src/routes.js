const express = require('express');
const routes = express.Router();

const publicRecipes = require('./app/controllers/public/recipes');
const publicChefs = require('./app/controllers/public/chefs')

const chefs = require('./app/controllers/admin/chefs');
const recipes = require('./app/controllers/admin/recipes');

// const recipes = require('./data');

// ************************
// PUBLIC
// ************************

routes.get("/", publicRecipes.main);
routes.get("/recipes", publicRecipes.index);
routes.get("/recipes/:id", publicRecipes.show);
routes.get("/chefs", publicChefs.index);
routes.get("/about", publicRecipes.about);


// routes.get("/recipes", publicRecipes.index);

// routes.get("/recipes/:id", publicRecipes.show);

// routes.get("/recipes/:id", (req, res) => {
//   const recipeIndex = req.params.id;
//   const length = recipes.length;
//   if (recipeIndex >= length) {
//     return console.log('Recipe is not found')
//   }
//   const recipe = recipes[recipeIndex];
//   return res.render("public/recipe", { recipe });
// });

// routes.get("/about", publicRecipes.about);

// ************************
// ADMIN
// ************************

routes.get("/admin/recipes", recipes.index);
routes.get("/admin", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit",recipes.edit);

routes.post('/admin/recipes', recipes.post);
routes.put('/admin/recipes', recipes.put);
routes.delete('/admin/recipes', recipes.delete);
  
routes.get('/admin/chefs', chefs.index);
routes.get('/admin/chefs/create', chefs.create);
routes.get('/admin/chefs/:id', chefs.show);
routes.get('/admin/chefs/:id/edit', chefs.edit);

routes.post('/admin/chefs', chefs.post);
routes.put('/admin/chefs', chefs.put);
routes.delete('/admin/chefs', chefs.delete);


module.exports = routes;