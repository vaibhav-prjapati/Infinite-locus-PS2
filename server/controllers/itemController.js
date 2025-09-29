import Item from '../models/itemModel.js';

// @desc    Fetch all items
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
  const items = await Item.find({});
  res.json(items);
};

// @desc    Create an item
// @route   POST /api/items
// @access  Private/Admin (for simplicity, we'll just use auth middleware)
const createItem = async (req, res) => {
  const { name, price, stockCount } = req.body;
  const item = new Item({ name, price, stockCount });
  const createdItem = await item.save();
  res.status(201).json(createdItem);
};

export { getItems, createItem };