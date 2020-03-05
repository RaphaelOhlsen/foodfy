const express = require('express');
const routes = express.Router();
const adminRecipes = require('./controllers/adminRecipes');
const publicRecipes = require('./controllers/publicRecipes');

const recipes = require('./data');

// ************************
// PUBLIC
// ************************

routes.get("/", publicRecipes.main);



routes.get("/recipes", publicRecipes.index);

routes.get("/recipes/:id", publicRecipes.show);

// routes.get("/recipes/:id", (req, res) => {
//   const recipeIndex = req.params.id;
//   const length = recipes.length;
//   if (recipeIndex >= length) {
//     return console.log('Recipe is not found')
//   }
//   const recipe = recipes[recipeIndex];
//   return res.render("public/recipe", { recipe });
// });

routes.get("/about", publicRecipes.about);

// ************************
// ADMIN
// ************************

routes.get("/admin/recipes", adminRecipes.index);
routes.get("/admin", adminRecipes.index);
routes.get("/admin/recipes/create", adminRecipes.create);
routes.get("/admin/recipes/:id", adminRecipes.show);
routes.get("/admin/recipes/:id/edit", adminRecipes.edit);

routes.post('/admin/recipes', adminRecipes.post);
routes.put('/admin/recipes', adminRecipes.put);
routes.delete('/admin/recipes', adminRecipes.delete)


module.exports = routes;