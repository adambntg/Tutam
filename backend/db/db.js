const { Pool } = require('pg');

const pool = new Pool({
  user: 'neondb_owner',
  host: 'ep-dawn-truth-a53rt2y3.us-east-2.aws.neon.tech',
  database: 'tutam9',
  password: 'bP5BXFDO0YdG',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
