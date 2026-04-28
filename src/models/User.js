import db from '../config/db.js';

class User {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }

  static async findAll() {
    try {
      const [rows] = await db.query('SELECT * FROM users');
      return rows.map(row => new User(row.id, row.name, row.age));
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length === 0) return null;
      const user = rows[0];
      return new User(user.id, user.name, user.age);
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  static async create(userData) {
    const { name, age } = userData;
    try {
      const [result] = await db.query(
        'INSERT INTO users (name, age) VALUES (?, ?)',
        [name, age]
      );
      return new User(result.insertId, name, age);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async update(id, userData) {
    const { name, age } = userData;
    try {
      const [result] = await db.query(
        'UPDATE users SET name = ?, age = ? WHERE id = ?',
        [name, age, id]
      );
      if (result.affectedRows === 0) return null;
      return new User(id, name, age);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default User;