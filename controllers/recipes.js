const data = require('../data.json');

exports.index = (req, res) => {
  const recipes = data.recipes;
  return res.render('admin/index', { recipes })
}