import BaseController from './BaseController.js';
import UserService from '../service/UserService.js';

const ERROR_STATUS = {
  NOT_FOUND:          { status: 404, message: 'User not found' },
  MISSING_FIELDS:     { status: 400, message: 'Name and age are required' },
  INVALID_AGE:        { status: 400, message: 'Age must be between 0 and 150' },
  NO_FIELDS_PROVIDED: { status: 400, message: 'At least one field required' },
  DELETE_FAILED:      { status: 500, message: 'Failed to delete user' },
};

export default class UserController extends BaseController {
  constructor() {
    super();
    this.userService = new UserService();
  }

  #handleError(res, error) {
    const known = ERROR_STATUS[error.message];
    return known
      ? this.error(res, known.message, known.status)
      : this.error(res, error.message, 500);
  }

  async getUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      this.success(res, users, 'Users fetched successfully');
    } catch (e) { this.#handleError(res, e); }
  }

  async getUserById(req, res) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      this.success(res, user, 'User fetched successfully');
    } catch (e) { this.#handleError(res, e); }
  }

  async createUser(req, res) {
    try {
      const user = await this.userService.createUser(req.body);
      this.success(res, user, 'User created successfully', 201);
    } catch (e) { this.#handleError(res, e); }
  }

  async updateUser(req, res) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      this.success(res, user, 'User updated successfully');
    } catch (e) { this.#handleError(res, e); }
  }

  async deleteUser(req, res) {
    try {
      await this.userService.deleteUser(req.params.id);
      this.success(res, null, 'User deleted successfully');
    } catch (e) { this.#handleError(res, e); }
  }

  async searchUsers(req, res) {
    try {
      const users = await this.userService.searchByName(req.query.name);
      this.success(res, users, 'Search results');
    } catch (e) { this.#handleError(res, e); }
  }
}