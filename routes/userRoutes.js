import express from 'express';
import {
  signUpUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userControllers.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// protect ensures only authenticated users can get users
router.route('/').get(protect, getUsers);

router
  .route('/:id')
  .get(protect, getUserById)
  .delete(protect, deleteUser)
  .put(protect, updateUser);

router.route('/signup').post(signUpUser);

router.route('/login').post(loginUser);

export default router;
