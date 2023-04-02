const bcrypt = require("bcrypt");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "rootuser",
  host: "localhost",
  database: "users",
  password: "root",
  port: 5432,
});

async function Login(req, res) {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      `SELECT email, password FROM users WHERE email='${email}'`
    );
    if (!result.rows[0]) {
      throw {
        status: 401,
        message: "Non authorization",
        data: null,
      };
    }
    const checkPassword = await bcrypt.compare(
      password,
      result.rows[0].password
    );
    if (!checkPassword) {
      throw {
        status: 400,
        message: "Password is wrong",
        data: null,
      };
    }
    res.status(200).json({
      status: 200,
      message: "Authorization is done",
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

module.exports = Login;
