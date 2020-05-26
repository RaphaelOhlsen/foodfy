const db = require('../../config/db');
const { date } = require('../../lib/utils')

module.exports = {

  all() {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ORDER BY recipes.id
    `);
  },

  search(search) {
    let query = "",
        filter = "";

    if(search) {
      filter = `WHERE recipes.title ILIKE '%${search}%'`
    };

    query = `
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ${filter}
    `;

    return db.query(query);
  },

  popular() {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.popular = true`
    );
  },

  create(data) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        title,
        ingredients,
        preparation,
        information,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      date(Date.now()).iso
    ];

    return db.query(query, values);
  },

  find(id) {
    try {
      return db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id]);
    } catch(err) {
      console.error(err);
    }
  },

  update(data) {
  
    const query = `
      UPDATE recipes SET
        chef_id=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5)
      WHERE id = $6
    `;

    const values = [
      data.chef_id,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ];

    return db.query(query, values)
  },

  async delete(id) { 
    let removedFiles = await db.query(
      `
        SELECT file_id FROM recipe_files
        WHERE recipe_id = ${id}`
    );
    
    removedFiles = removedFiles.rows.map(file => file.file_id);

    await db.query(`DELETE FROM recipe_files WHERE recipe_id = ${id}`);
    await db.query(`DELETE FROM recipes WHERE id = ${id}`);

    return removedFiles;
  },

  chefSelectOptions() {
    return db.query(`SELECT name, id FROM chefs`);
  },

  recipeFiles({fileId, recipeId}) {
    const query = `
      INSERT INTO recipe_files (
        recipe_id,
        file_id
      ) VALUES ($1, $2)
      RETURNING id
    `;

    const values = [
      recipeId,
      fileId
    ]

    return db.query(query, values);
  }
}