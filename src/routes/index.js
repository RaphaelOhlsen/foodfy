const express = require('express');
const routes = express.Router();
const multer = require('../app/middlewares/multer');

const publicRecipes = require('../app/controllers/public/recipes');
const publicChefs = require('../app/controllers/public/chefs')

const chefs = require('../app/controllers/admin/chefs');
const recipes = require('../app/controllers/admin/recipes');

// ************************
// PUBLIC
// ************************

routes.get("/", publicRecipes.main);
routes.get("/recipes", publicRecipes.index);
routes.get("/recipes/:id", publicRecipes.show);
routes.get("/chefs", publicChefs.index);
routes.get("/about", publicRecipes.about);

// ************************
// ADMIN
// ************************

routes.get("/admin/recipes", recipes.index);
routes.get("/admin", recipes.index);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit",recipes.edit);

routes.post('/admin/recipes', multer.array("photos", 5), recipes.post);
routes.put('/admin/recipes', multer.array("photos", 5), recipes.put);
routes.delete('/admin/recipes', recipes.delete);
  



module.exports = routes;