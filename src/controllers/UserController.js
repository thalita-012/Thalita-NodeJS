import User from '../models/User.js';

export default class UserController {
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json({
        success: true,
        data: users,
        message: 'Users fetched successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.status(200).json({
        success: true,
        data: user,
        message: 'User fetched successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async createUser(req, res) {
    try {
      const { name, age } = req.body;

      if (!name || age === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Name and age are required'
        });
      }

      if (age < 0 || age > 150) {
        return res.status(400).json({
          success: false,
          message: 'Age must be between 0 and 150'
        });
      }

      const user = await User.create({ name, age });

      res.status(201).json({
        success: true,
        data: user,
        message: 'User created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, age } = req.body;

      if (name === undefined && age === undefined) {
        return res.status(400).json({
          success: false,
          message: 'At least one field (name or age) is required for update'
        });
      }

      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const updateData = {
        name: name !== undefined ? name : existingUser.name,
        age: age !== undefined ? age : existingUser.age
      };

      const updatedUser = await User.update(id, updateData);

      res.status(200).json({
        success: true,
        data: updatedUser,
        message: 'User updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const deleted = await User.delete(id);

      if (deleted) {
        res.status(200).json({
          success: true,
          message: 'User deleted successfully'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}