const User = require('../models/User');

function checkAllFields(req) {

  const keys = Object.keys(req.body);

  for(key of keys) {
    if(req.body[key] == "" && key !== "password") {
      return {
        user: req.body,
        error: 'Favor completar todos os campos.'
      };
    }
    
  }
}

async function post(req, res, next) {

  const fillAllFiels = checkAllFields(req);
  if(fillAllFiels)
    return res.render("admin/users/create", fillAllFiels);

  if (req.body.isAdmin)
    req.body.isAdmin = true;
  else
    req.body.isAdmin = false;


  //checar se o usuário já existe pelo email
  const { email } = req.body;
  const user = await User.findOne(email)
  
  if(user) {
    const user = req.body;
    const error = "Usuário já cadastrado. Tente outro email"
    return res.render('admin/users/create', { user, error });
  } 
  
  next();
}

module.exports = {
  post
}