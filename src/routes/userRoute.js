import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();
const ctrl   = new UserController();

const validateId = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid ID' });
  }
  req.params.id = id;
  next();
};

router.get('/users',       ctrl.getUsers.bind(ctrl));
router.get('/users/search', ctrl.searchUsers.bind(ctrl));        // GET /users?name=xxx
router.get('/users/:id',    validateId, ctrl.getUserById.bind(ctrl));
router.post('/users',      ctrl.createUser.bind(ctrl));
router.put('/users/:id',    validateId, ctrl.updateUser.bind(ctrl));
router.delete('/users/:id', validateId, ctrl.deleteUser.bind(ctrl));

export default router;