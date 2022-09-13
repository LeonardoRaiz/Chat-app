const { client, pool } = require("../database/database");

const allMessages = async (req, res) => {
  let query = `SELECT id, "from", "to", msg FROM "message" where ("from" = '${req?.from}' 
  AND "to" = '${req?.to}') OR ("from" = '${req?.to}' AND "to" = '${req?.from}') `;
  let allMessages = "";
  await client.query(query).then((res) => {
      allMessages = JSON.parse(JSON.stringify(res.rows));
  });
  return allMessages;
};

const insertMsg = async (req, res) => {
  let query = `INSERT INTO "message" 
    (id, "from", "to", msg, timestamps) VALUES (uuid_generate_v4(), 
    '${req?.from}', '${req?.to}', '${req?.msg}', NOW()) RETURNING *`;
  let validation = false;
  await client.query(query).then((res) => {
    if (res.rows[0]) {
      validation = true;
    }
  });
  return validation;
};

module.exports = {
  allMessages,
  insertMsg,
};
