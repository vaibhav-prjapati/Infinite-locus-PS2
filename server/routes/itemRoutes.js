import express from 'express';
const router = express.Router();
import { getItems, createItem } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getItems).post(protect, createItem);

export default router;