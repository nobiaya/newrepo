// models/inventory-model.js

const pool = require("../database/index") // your database connection

/* ***************************
 *  Get all classifications
 * ************************** */
async function getClassifications() {
  try {
    const data = await pool.query("SELECT * FROM public.classification");
    return data.rows; // returns an array of classifications
  } catch (error) {
    console.error("getClassifications error: " + error);
    return []; // fallback empty array so getNav won't crash
  }
}

module.exports = {
  getClassifications,
  // other exports like getInventoryByClassificationId
};


/* ***************************
 *  Get inventory by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT *
       FROM public.inventory AS i
       JOIN public.classification AS c
       ON i.classification_id = c.classification_id
       WHERE i.classification_id = $1`,
      [classification_id]
    )

    return data.rows
  } catch (error) {
    console.error(
      "getInventoryByClassificationId error:",
      error
    )
  }
}

/* ***************************
 * Export Functions
 * ************************** */
module.exports = {
  getClassifications,
  getInventoryByClassificationId,
}