import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  createorder,
  getOrders,
  getOrderById,
  deleteOrder,
} from '../controllers/orderControllers.js';

const router = express.Router();

router.route('/').get(protect, getOrders).post(protect, createorder);

router.route('/:id').get(protect, getOrderById).delete(protect, deleteOrder);

export default router;
