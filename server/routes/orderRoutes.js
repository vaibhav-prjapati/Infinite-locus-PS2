import express from 'express';
const router = express.Router();
import { createOrder, getOrderHistory } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createOrder);
router.route('/history').get(protect, getOrderHistory);

export default router;