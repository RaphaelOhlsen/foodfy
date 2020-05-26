const db = require('../../config/db');
const fs = require('fs');

module.exports = {
  create({ filename, path }) {
    try {
      const query = `
        INSERT INTO files (
          name,
          path
        ) VALUES ($1, $2)
        RETURNING id
      `;
  
      const values = [
        filename,
        path
      ];
  
      return db.query(query, values);
    } catch(err) {
        console.error(err);
    }
  },

  find(id) {
    try {
      return  db.query(`
        SELECT files.*, recipes.title, recipes.id AS recipe_id FROM recipe_files
        LEFT JOIN files ON (files.id = recipe_files.file_id)
        LEFT JOIN recipes ON (recipes.id = recipe_files.recipe_id)
        WHERE recipe_id = $1`, [id]);
    } catch(err) {
      console.error(err);
    }
  },

  async delete(id) {
    try {
      let result = await db.query(`DELETE FROM recipe_files WHERE file_id = $1`, [id]);
      result = await db.query(`SELECT * FROM files WHERE id = $1`, [id]);
      const file = result.rows[0];
      
      fs.unlinkSync(file.path);
  
      return db.query(`
        DELETE FROM files WHERE id = $1
      `, [id])
    } catch(err) {
      console.error(err);
    }
  },
  
}