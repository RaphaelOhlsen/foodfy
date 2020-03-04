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