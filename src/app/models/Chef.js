const db = require('../../config/db');
const { date } = require('../../lib/utils');
const fs = require('fs');

module.exports = {
  all() {
    return db.query(`
      SELECT chefs.id, chefs.name, files.path AS avatar
      FROM chefs
      LEFT JOIN files ON (chefs.file_id = files.id)
      ORDER BY chefs.id
    `)
  },

  create(data, file_id) {
    
    const query = `
      INSERT INTO chefs (
       name,
       created_at,
       file_id 
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [
      data.name,
      date(Date.now()).iso,
      file_id
    ];

    return db.query(query, values);
  },

  find(id) {
    
    try{
      return db.query(`
        SELECT chefs.id, chefs.name, chefs.file_id, files.path AS avatar, recipes.id AS _id 
        FROM chefs
        LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
        LEFT JOIN files ON (chefs.file_id = files.id)
        WHERE chefs.id = $1
      `,[id]);
    } catch(err) {
      console.error(err);
    }
  },

  update(data) {
    
    const query = `
      UPDATE chefs SET
        name=($1),
        file_id=($2)
      WHERE id = $3
    `;

    const values = [
      data.name,
      data.fileId,
      data.id
    ];

    return db.query(query, values);

  },

  async delete(data) {
  
    const result = await db.query(`SELECT * FROM files WHERE id = $1`, [data.fileId]);
    const file = result.rows[0];
    fs.unlinkSync(file.path);
    await db.query(`DELETE FROM chefs WHERE id = $1`, [data.id]);
    await db.query(` DELETE FROM files WHERE id = $1`, [data.fileId]);
  },
}