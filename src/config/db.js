import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'thalita-nodejs',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Connected to MySQL database!');
    connection.release();
  } catch (err) {
    console.log('❌ Error connecting to MySQL:', err.message);
  }
};

testConnection();

export default db;