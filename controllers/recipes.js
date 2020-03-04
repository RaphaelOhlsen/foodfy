const data = require('../data.json');

exports.index = (req, res) => {
  const recipes = data.recipes;
  return res.render('admin/index', { recipes })
}

exports.create = (req, res) => {
  return res.render('admin/create');
}