const fs = require('fs');
const data = require('../data.json');

exports.index = (req, res) => {
  const recipes = data.recipes;
  return res.render('admin/index', { recipes })
}

exports.create = (req, res) => {
  return res.render('admin/create');
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  keys.forEach(key => {
    if(req.body[key] == "") {
      return res.send("Favor preencher todos os campos");
    }
  });

  let { 
    image, 
    title, 
    author, 
    ingredients, 
    preparation, 
    information } = req.body;
  
  let id = 1;
  const lastRecipe = data.recipes[data.recipes.length - 1];
  if(lastRecipe) {
    id = lastRecipe.id + 1;
  }

  data.recipes.push({
    id,
    image,
    title,
    author,
    ingredients,
    preparation,
    information
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write file error");
    return res.redirect("/admin");
  });
  
}

exports.show = (req,res) => {
  const { id } = req.params;
  const recipe = data.recipes.find(recipe => {
    return recipe.id == id;
  });
  if (!recipe) return res.send("receita não foi encontrada");
  return res.render("admin/recipe", { recipe });
}

exports.edit = (req, res) => {
  const { id } = req.params;
  const recipe = data.recipes.find(recipe => {
    return recipe.id == id;
  })
  if (!recipe) return res.send("receita não foi encontrada");
  return res.render("admin/edit", { recipe });
}

exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundRecipe = data.recipes.find((recipe, foundIndex) => {
    if (recipe.id == id ) {
      index = foundIndex;
      return true;
    } 
  });

  if (!foundRecipe) return res.send("receita não foi encontrada");

  const recipe = {
    ...foundRecipe,
    ...req.body
  }

  data.recipes[index] = recipe;
  
  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if(err) return res.send("Write error!");
    return res.redirect(`/admin/recipes/${id}`);
  });

}

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredRecipes = data.recipes.filter(recipe => {
    return recipe.id != id;
  });

  data.recipes = filteredRecipes;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
    if(err) return res.send("Write error!");
    return res.redirect("/admin/recipes");
  });
}