import mysql from 'mysql2';
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',        
  password: '',        
  database: 'thalita-nodejs'
});

db.getConnection(err => {
  if (err) {
    console.log('Error:', err);
    return;
  }
  console.log('Connected to MySQL!');
});
export default db;