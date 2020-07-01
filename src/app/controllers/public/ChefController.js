const Chefs = require('../../models/Chef');

module.exports = {
  
  async index(req,res) {
    let results = await Chefs.all();
    let chefs = results.rows;
    
    // chefs.forEach(async chef => {
    //   chef.avatar = `${req.protocol}://${req.headers.host}${chef.avatar.replace("public", "")}`
    // });

    async function getTotalRecipes(chefId) {
      result = await Chefs.totalRecipes(chefId);
      return result.rows.map(el => el.total)[0];
    }

    const totalRecipesPromise = chefs.map(async chef => {
      chef.avatar = `${req.protocol}://${req.headers.host}${chef.avatar.replace("public", "")}`
      chef.total_recipes = await getTotalRecipes(chef.id);
    });

    await Promise.all(totalRecipesPromise);
   
    return res.render('public/chefs/index', { chefs })
  },
}