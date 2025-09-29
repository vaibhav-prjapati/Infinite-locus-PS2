// @desc    Cancel order and restore stock
// @route   POST /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  if (order.status !== 'PENDING') {
    return res.status(400).json({ message: 'Order is not pending' });
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Restore stock for each item in the order
    for (const orderItem of order.orderItems) {
      await Item.updateOne(
        { _id: orderItem.item },
        { $inc: { stockCount: orderItem.qty } }
      ).session(session);
    }
    // Update order status
    order.status = 'CANCELLED';
    await order.save({ session });
    await session.commitTransaction();
    session.endSession();
    res.json({ message: 'Order cancelled and stock restored', order });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};
import mongoose from 'mongoose';
import Order from '../models/orderModel.js';
import Item from '../models/itemModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Check stock for all items within the transaction
    for (const orderItem of orderItems) {
      const item = await Item.findById(orderItem.item).session(session);
      if (!item) {
        throw new Error(`Item not found: ${orderItem.name}`);
      }
      if (item.stockCount < orderItem.qty) {
        throw new Error(`Not enough stock for ${item.name}. Available: ${item.stockCount}`);
      }
    }
    
    // 2. Decrement stock for all items
    for (const orderItem of orderItems) {
      await Item.updateOne(
        { _id: orderItem.item },
        { $inc: { stockCount: -orderItem.qty } }
      ).session(session);
    }
    
    // 3. Create the order
    const order = new Order({
      user: req.user._id,
      orderItems,
      totalPrice,
    });

    const createdOrder = await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(createdOrder);

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(400).json({ message: error.message });
  }
};


// @desc    Get logged in user's order history
// @route   GET /api/orders/history
// @access  Private
const getOrderHistory = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};


export { createOrder, getOrderHistory, cancelOrder };