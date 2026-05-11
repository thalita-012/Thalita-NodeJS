export default class BaseRepository {
  constructor(db, table, Model) {
    this.db    = db;
    this.table = table;
    this.Model = Model;
  }

  async findAll() {
    const [rows] = await this.db.query(`SELECT * FROM ${this.table}`);
    return rows.map(row => this.Model.fromRow(row));
  }

  async findById(id) {
    const [rows] = await this.db.query(
      `SELECT * FROM ${this.table} WHERE id = ?`, [id]
    );
    return rows.length ? this.Model.fromRow(rows[0]) : null;
  }

  async create(data) {
    const keys         = Object.keys(data);
    const values       = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');

    const [result] = await this.db.query(
      `INSERT INTO ${this.table} (${keys.join(', ')}) VALUES (${placeholders})`,
      values
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    const keys      = Object.keys(data);
    const values    = Object.values(data);
    const setClause = keys.map(k => `${k} = ?`).join(', ');

    const [result] = await this.db.query(
      `UPDATE ${this.table} SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
    return result.affectedRows ? this.findById(id) : null;
  }

  async delete(id) {
    const [result] = await this.db.query(
      `DELETE FROM ${this.table} WHERE id = ?`, [id]
    );
    return result.affectedRows > 0;
  }
}