import express from 'express'
import db from './database.js';
const app = express()
app.use(express.json());
//Get User
app.get('/users', (req, res) => {
  db.query(
    'SELECT * FROM users', 
    (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

//Create User
app.post('/users', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).send('Name and age required');
  }
  db.query(
    'INSERT INTO users (name, age) VALUES (?, ?)',
    [name, age],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({
        id: result.insertId,
        name,
        age
      });
    }
  );
});

//update users
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  db.query(
    'UPDATE users SET name = ?, age = ? WHERE id = ?',
    [name, age, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.length === 0) {
        return res.status(404).send('User not found');
      }
      res.send('User updated successfully');
    }
  );
});

//Delete user  
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?',
    [id], 
    (err, result) => {  
    if (err) return res.status(500).json(err);
      if (result.length === 0) {
        return res.status(404).send('User not found');
      }
  });
  res.send('User deleted successfully');
});



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
