import express from 'express';
const router = express.Router();
import { getItems, createItem } from '../controllers/itemController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(getItems).post(protect, createItem); // Assuming only logged-in users can create

export default router;