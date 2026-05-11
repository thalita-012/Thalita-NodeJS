import BaseService from './BaseService.js';
import UserRepository from '../repositories/UserRepository.js';

export default class UserService extends BaseService {
  constructor() {
    super(new UserRepository());
  }

  async getAllUsers() {
    return await this.getAll();
  }

  async getUserById(id) {
    const user = await this.getById(id);
    if (!user) throw new Error('NOT_FOUND');
    return user;
  }

  async createUser({ name, age }) {
    if (!name || age === undefined) throw new Error('MISSING_FIELDS');
    if (age < 0 || age > 150)      throw new Error('INVALID_AGE');
    return await this.repository.create({ name, age });
  }

  async updateUser(id, { name, age }) {
    if (name === undefined && age === undefined) {
      throw new Error('NO_FIELDS_PROVIDED');
    }
    const existing = await this.repository.findById(id);
    if (!existing) throw new Error('NOT_FOUND');

    return await this.repository.update(id, {
      name: name ?? existing.name,
      age:  age  ?? existing.age,
    });
  }

  async deleteUser(id) {
    return await this.delete(id);
  }

  async searchByName(name) {
    if (!name) throw new Error('MISSING_FIELDS');
    return await this.repository.findByName(name);
  }
}