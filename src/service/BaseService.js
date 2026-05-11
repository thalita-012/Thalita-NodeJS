export default class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.findAll();
  }

  async getById(id) {
    return await this.repository.findById(id);
  }

  async delete(id) {
    const existing = await this.repository.findById(id);
    if (!existing) throw new Error('NOT_FOUND');

    const deleted = await this.repository.delete(id);
    if (!deleted) throw new Error('DELETE_FAILED');
    return null;
  }
}