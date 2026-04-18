const pool = require("../database/");
const bcrypt = require("bcryptjs");

/* =========================
   REGISTER NEW ACCOUNT
========================= */
async function registerAccount(
  account_firstname,
  account_lastname,
  account_email,
  account_password
) {
  try {
    const hashedPassword = await bcrypt.hash(account_password, 10);

    const sql = `
      INSERT INTO account 
        (account_firstname, account_lastname, account_email, account_password, account_type)
      VALUES 
        ($1, $2, $3, $4, 'Client')
      RETURNING account_id, account_firstname, account_lastname, account_email, account_type
    `;

    const result = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword,
    ]);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/* =========================
   CHECK EXISTING EMAIL
========================= */
async function checkExistingEmail(account_email, account_id = null) {
  try {
    let sql;
    let result;

    if (account_id) {
      sql = `
        SELECT 1 
        FROM account 
        WHERE account_email = $1 AND account_id != $2
      `;
      result = await pool.query(sql, [account_email, account_id]);
    } else {
      sql = `
        SELECT 1 
        FROM account 
        WHERE account_email = $1
      `;
      result = await pool.query(sql, [account_email]);
    }

    return result.rowCount > 0;
  } catch (error) {
    throw error;
  }
}

/* =========================
   GET ACCOUNT BY EMAIL
========================= */
async function getAccountByEmail(account_email) {
  try {
    const sql = `
      SELECT 
        account_id,
        account_firstname,
        account_lastname,
        account_email,
        account_type,
        account_password
      FROM account
      WHERE account_email = $1
    `;

    const result = await pool.query(sql, [account_email]);

    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
}

/* =========================
   GET ACCOUNT BY ID
========================= */
async function getAccountDetailsById(account_id) {
  try {
    const sql = `
      SELECT 
        account_id,
        account_firstname,
        account_lastname,
        account_email
      FROM account
      WHERE account_id = $1
    `;

    const result = await pool.query(sql, [account_id]);

    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
}

/* =========================
   UPDATE ACCOUNT INFO
========================= */
async function updateAccount(
  account_id,
  account_firstname,
  account_lastname,
  account_email
) {
  try {
    const sql = `
      UPDATE account
      SET account_firstname = $1,
          account_lastname = $2,
          account_email = $3
      WHERE account_id = $4
      RETURNING account_id, account_firstname, account_lastname, account_email
    `;

    const result = await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_id,
    ]);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/* =========================
   CHANGE PASSWORD
========================= */
async function changePassword(account_password, account_id) {
  try {
    const hashedPassword = await bcrypt.hash(account_password, 10);

    const sql = `
      UPDATE account
      SET account_password = $1
      WHERE account_id = $2
      RETURNING account_id
    `;

    const result = await pool.query(sql, [hashedPassword, account_id]);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

/* =========================
   ADD FAVORITE
========================= */
async function addFavorite(account_id, inv_id) {
  try {
    const sql = `
      INSERT INTO favorite (account_id, inv_id)
      VALUES ($1, $2)
      ON CONFLICT (account_id, inv_id) DO NOTHING
      RETURNING account_id, inv_id
    `;

    const result = await pool.query(sql, [account_id, inv_id]);

    return result.rows[0] || null; // null if already exists
  } catch (error) {
    throw error;
  }
}

/* =========================
   REMOVE FAVORITE
========================= */
async function deleteFavorite(account_id, inv_id) {
  try {
    const sql = `
      DELETE FROM favorite
      WHERE account_id = $1 AND inv_id = $2
      RETURNING account_id, inv_id
    `;

    const result = await pool.query(sql, [account_id, inv_id]);

    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
}

/* =========================
   GET USER FAVORITES
========================= */
async function getFavoritesByAccount(account_id) {
  try {
    const sql = `
      SELECT 
        i.inv_id,
        i.inv_make,
        i.inv_model,
        i.inv_thumbnail,
        i.inv_price
      FROM favorite f
      JOIN inventory i ON f.inv_id = i.inv_id
      WHERE f.account_id = $1
    `;

    const result = await pool.query(sql, [account_id]);

    return result.rows;
  } catch (error) {
    throw error;
  }
}

/* =========================
   CHECK FAVORITE EXISTS
========================= */
async function checkFavorite(account_id, inv_id) {
  try {
    const sql = `
      SELECT 1
      FROM favorite
      WHERE account_id = $1 AND inv_id = $2
    `;

    const result = await pool.query(sql, [account_id, inv_id]);

    return result.rowCount > 0;
  } catch (error) {
    throw error;
  }
}

/* =========================
   EXPORT MODULE
========================= */
module.exports = {
  registerAccount,
  checkExistingEmail,
  getAccountByEmail,
  getAccountDetailsById,
  updateAccount,
  changePassword,
  addFavorite,
  deleteFavorite,
  getFavoritesByAccount,
  checkFavorite,
};