const Chef = require('../../models/Chef');
const File = require('../../models/File');


async function index(req,res) {
  let results = await Chef.all();
  
  const chefs = results.rows;

  if(!results) {
    const error = "Não possui chefs cadastrados"
    return res.render('admin/chefs/index', { error });
  }

  chefs.forEach(chef => {
    chef.avatar = `${req.protocol}://${req.headers.host}${chef.avatar.replace("public", "")}`;
  })

  return res.render('admin/chefs/index', { chefs, error: req.error });
    
}

function create(req,res) {
  return res.render('admin/chefs/create');
}

async function post(req, res) {
  
  const file = req.files[0];

  let result = await File.create(file);

  const fileId = result.rows[0].id;

  result = await Chef.create(req.body, fileId);

  const chef = result.rows[0];

  return res.redirect(`/admin/chefs/${chef.id}`);

}

async function show(req, res) {
  let results =  await Chef.find(req.params.id);
  
  if(!results.rows.length) {
    req.error = 'Este Chef não está cadastrado!';
    return index(req, res);
  }

  const chef = results.rows[0];
  chef.total_recipes = 0;
  chef.avatar = `${req.protocol}://${req.headers.host}${chef.avatar.replace("public", "")}`;

  if(chef.recipe_id != null) {
    const recipes = results.rows.map(chef => {
      return chef.recipe_id
    });
    chef.recipes = [];
    const recipesPromise = recipes.map(async recipe => {
      results = await File.find(recipe);
      results = results.rows[0];
      results.path = `${req.protocol}://${req.headers.host}${results.path.replace("public", "")}`
      chef.recipes.push(results);
    })
    await Promise.all(recipesPromise);
    chef.total_recipes = chef.recipes.length;
  }
  delete chef.recipe_id;

  return res.render(`admin/chefs/show`, {chef});
}

async function put(req, res) {

  if(req.files != 0) {
    const file = req.files[0];
    const result = await File.create(file);
    req.body.fileId = result.rows[0].id;
  }
  
  await Chef.update(req.body);

  if(req.body.removed_files) {
    const removedFile = req.body.removed_files.split(',')[0];
    await File.delete(removedFile);
  }
  
  return res.redirect(`/admin/chefs/${req.body.id}`);

}

async function edit(req, res) {
  const error = req.query.error;
  let result = await Chef.find(req.params.id);
  const chef = result.rows[0];
  chef.avatar =  `${req.protocol}://${req.headers.host}${chef.avatar.replace("public", "")}`;
  return res.render(`admin/chefs/edit`, { chef, error });
}

async function deleted(req, res) {
  Chef.delete(req.body);
  return res.redirect('/admin/chefs');
}

module.exports = {
  index,
  create,
  post,
  show,
  put,
  edit,
  deleted
}