import cron from 'node-cron';
import mongoose from 'mongoose';
import Order from '../models/orderModel.js';
import Item from '../models/itemModel.js';

const cancelStaleOrders = async () => {
  console.log('Running cron job to cancel stale orders...');
  
  // Find orders that are 'PENDING' and older than 15 minutes
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  const staleOrders = await Order.find({
    status: 'PENDING',
    createdAt: { $lte: fifteenMinutesAgo },
  });

  if (staleOrders.length === 0) {
    console.log('No stale orders to cancel.');
    return;
  }

  console.log(`Found ${staleOrders.length} stale orders to cancel.`);

  for (const order of staleOrders) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // 1. Restore stock for each item in the order
      for (const orderItem of order.orderItems) {
        await Item.updateOne(
          { _id: orderItem.item },
          { $inc: { stockCount: orderItem.qty } }
        ).session(session);
      }

      // 2. Update the order status to 'CANCELLED'
      order.status = 'CANCELLED';
      await order.save({ session });

      await session.commitTransaction();
      console.log(`Order ${order._id} cancelled and stock restored.`);
    } catch (error) {
      await session.abortTransaction();
      console.error(`Failed to cancel order ${order._id}:`, error);
    } finally {
      session.endSession();
    }
  }
};

const startCancellationJob = () => {
  // Schedule the job to run every minute
  cron.schedule('* * * * *', cancelStaleOrders);
};

export default startCancellationJob;