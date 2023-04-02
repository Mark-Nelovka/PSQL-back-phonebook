const bcrypt = require("bcrypt");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "rootuser",
  host: "localhost",
  database: "users",
  password: "root",
  port: 5432,
});

async function Reqistration(req, res) {
  const { email, password } = req.body;
  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);
  try {
    const result = await pool.query(
      `INSERT INTO users (email, password) VALUES ('${email}', '${hashPassword}') RETURNING *`
    );
    console.log(result);
    if (!result.rows[0]) {
      throw {
        status: 500,
        message: "Ooops, something is wrong. Repete again, please",
        data: null,
      };
    }
    res.status(200).json({
      status: 201,
      message: "User created",
      data: result.rows[0].email,
    });
  } catch (error) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: error.data,
    });
  }
}

module.exports = Reqistration;
