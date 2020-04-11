const Recipes = require('../../models/Recipe');

module.exports = {
  main(req,res) {
    Recipes.popular( recipes => {
      return res.render('public/main', { recipes });
    })
  },

  index(req,res) {
    let { search } = req.query; 
    Recipes.search( search, recipes => {
      return res.render('public/recipes/index', { recipes, search });
    })
  },

  show(req,res) {
    const { id } = req.params;
    Recipes.find(id, function(recipe) {
      if(!recipe) return res.send('Recipe not found!');
      return res.render('public/recipes/show', { recipe });
    });
  },

  about(req,res) {
    return res.render('public/about')
  }

}