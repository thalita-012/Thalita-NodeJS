import BaseModel from './BaseModel.js';

export default class User extends BaseModel {
  constructor(id, name, age) {
    super(id);
    this.name = name;
    this.age  = age;
  }

  static fromRow(row) {
    return new User(row.id, row.name, row.age);
  }
}