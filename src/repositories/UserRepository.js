import BaseRepository from './BaseRepository.js';
import User from '../models/User.js';
import db from '../config/db.js';

export default class UserRepository extends BaseRepository {
  constructor() {
    super(db, 'users', User);
  }

  async findByName(name) {
    const [rows] = await this.db.query(
      `SELECT * FROM ${this.table} WHERE name LIKE ?`, [`${name}`]
    );
    return rows.map(row => User.fromRow(row));
  }
}