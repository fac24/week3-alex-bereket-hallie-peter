const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const options = {
  connectionString: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

const db = new pg.Pool(options);


module.exports = db;