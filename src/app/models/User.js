const db = require('../../config/db');

module.exports = {
  async create(data) {
    const query = `
      INSERT INTO users (
        name,
        email,
        is_admin,
        password,
        reset_token,
        reset_token_expires
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      data.name,
      data.email,
      data.isAdmin,
      data.password,
      data.reset_token,
      data.reset_token_expires
    ];

    const results = await db.query(query, values);
    return results.rows[0].id;
  },

  async findOne(email) { 
   const results = await db.query(`
      SELECT * FROM users
      WHERE email = '${email}'
    `);

    return results.rows[0];
  }
}