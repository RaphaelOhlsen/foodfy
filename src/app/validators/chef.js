const Chef = require('../models/Chef');

function post(req, res, next) {
  console.log('entrei')
  if (req.body.name === "") {
    const error = "Preencha o campo None";
    return res.render('admin/chefs/create', {  error });
  }

  if (req.files.length == 0) {
    const error = "Envie um avatar";
    return res.render('admin/chefs/create', {  error });
  }

  next();
}

function put(req, res, next) {
  const keys = Object.keys(req.body);

  keys.forEach(key => {
    if(req.body[key] == "" && key != "removed_files") {
      return res.redirect(`/admin/chefs/${req.body.id}/edit/?error=Preencha o campo Nome`);
    }
  }); 

  if(req.body.removed_files && req.files == 0) 
    return res.redirect(`/admin/chefs/${req.body.id}/edit/?error=Envie um avatar`);

  next();
}

async function deleted(req, res, next) {
  let results = await Chef.find(req.body.id);
  if (results.rows[0].recipe_id) {
    return res.redirect(`/admin/chefs/${req.body.id}/edit/?error=Usuário não pode ser deletado pois possui receita`);
  }
  next();
}

module.exports = {
  post,
  put,
  deleted
}