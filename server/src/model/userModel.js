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

const findUserID = async (req, res) => {
  let query = `SELECT id FROM "users" WHERE username = '${req?.username}' `;
  let user = "";
  await client.query(query).then((res) => {
    if (res.rows[0]) {
      user = JSON.parse(JSON.stringify(res.rows[0]));
    }
  });
  return user.id
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

  const allUser = async (req, res) => {
    let query = `SELECT id, email, username,"avatarImage" FROM "users" `;
    let users  = "";
    await client.query(query).then((res) => {
      if (res.rows[0]) {
        //console.log(res.rows[0]);
        users = JSON.parse(JSON.stringify(res.rows));
      }
    });
    return users
  };

module.exports = {
  insertUser,
  findUser,
  findEmail,
  findPassword,
  updateAvatar,
  findAvatar,
  allUser,
  findUserID
};
