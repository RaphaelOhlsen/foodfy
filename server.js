const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

const recipes = require('./data');

server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
});

server.get("/", (req, res) => {
  return res.render("main", { recipes });
});

server.get("/recipes", (req, res) => {
  return res.render("recipes");
});

server.get("/recipes/:index", (req, res) => {
  const recipeIndex = req.params.index;
  const length = recipes.length;
  if (recipeIndex >= length) {
    return console.log('Recipe is not found')
  }
  const recipe = recipes[recipeIndex];
  console.log(recipe)
  return res.render("recipe", { recipe });
  // const id = req.query.id;
  // const recipe = recipes.find(recipe => recipe.id == id);
  // if (!recipe) res.send("Recipe is not found");
  // console.log(recipe);
  // return res.render("recipe", { recipe });
});

server.get("/about", (req,res) => {
  return res.render("about");
});

server.listen(5000, () => {
  console.log('Server is running')
});