const { client, pool } = require("../database/database");

const insertUser = async (username, email, password, avatarSet, avatarImage) => {
  let query = `INSERT INTO users 
  (id, username, email, password, "avatarSet", "avatarImage") VALUES (uuid_generate_v4(), 
  '${username}', '${email}', '${password}', '${avatarSet}', '${avatarImage}') RETURNING *`;

  pool.connect((err, client, done) => {
    if (err) throw err;
    client.query(query, [], (err, resp) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        console.log(resp.rows[0]);
        return resp.rows[0];
      }
    });
  });
};
const findUser = async (req, res) => {
  let query = `SELECT * FROM "users" WHERE username = '${req?.username}' `;
  let validation = false;
  await client.query(query).then((res) => {
    if (res.rows[0]) {
      validation = true;
    }
  });
  return validation
};

const findEmail = async (req, res) => {
    let query = `SELECT * FROM "users" WHERE email = '${req?.email}' `;
    let validation = false;
    await client.query(query).then((res) => {
      if (res.rows[0]) {
        validation = true;
      }
    });
    return validation
  };

  const findPassword = async (req, res) => {
    let query = `SELECT password FROM "users" WHERE username = '${req?.username}' `;
    let password  = "";
    await client.query(query).then((res) => {
      if (res.rows[0]) {
        //console.log(res.rows[0]);
        password = JSON.parse(JSON.stringify(res.rows[0]));
      }
    });
    return password['password']
  };

  const updateAvatar = async (user, image) => {
    let query = `UPDATE users SET "avatarImage" = '${image} ',"avatarSet" = true 
    WHERE username = '${user}' `;
    await client.query(query).then((res) => {
      if (res.rows[0]) {
        console.log(res.rows[0]);
      }
    });
    return true
  };

  const findAvatar = async (req, res) => {
    let query = `SELECT "avatarImage" FROM "users" WHERE username = '${req?.username}' `;
    let avatar  = "";
    await client.query(query).then((res) => {
      if (res.rows[0]) {
        //console.log(res.rows[0]);
        avatar = JSON.parse(JSON.stringify(res.rows[0]));
      }
    });
    return avatar.avatarImage
  };

module.exports = {
  insertUser,
  findUser,
  findEmail,
  findPassword,
  updateAvatar,
  findAvatar
};
