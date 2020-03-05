const data = require('../data.json');

exports.main = (req, res) => {
  const recipes = data.recipes;
  return res.render('public/main', { recipes })
}

exports.index = (req, res) => {
  const recipes = data.recipes;
  return res.render("public/recipes", { recipes });
}

exports.show = (req, res) => {
  const { id } = req.params;
  const recipe = data.recipes.find(recipe => {
    return recipe.id == id;
  });
  if(!recipe) return res.send("receita não foi encontrada");
  return res.render("public/recipe", { recipe });
}

exports.about = (req, res) => {
  return res.render("public/about");
}