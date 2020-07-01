const User = require('../../models/User');
const { hash } = require('bcryptjs');
const crypto = require('crypto');

module.exports = {
  registerForm(req, res) {
    return res.render("admin/users/create");
  },

  list(req, res) {
    return res.send('OK!')
  },

  async post(req,res) {
    
    // Create password
    const password = crypto.randomBytes(5).toString('hex');
    const hashPassword = await hash(password, 8);

    const data = {
      ...req.body,
      password: hashPassword,
      reset_token: '12',
      reset_token_expires: '12'
    }

    const userId = await User.create(data);
    console.log(userId);
    req.session.userId = userId;
    return res.redirect('/admin/users');

  }
}