import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import items from './data/items.js';
import Item from './models/itemModel.js';
import Order from './models/orderModel.js';
import User from './models/userModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Item.deleteMany();
    // We are not deleting users for this seeder

    // Insert new items
    await Item.insertMany(items);

    console.log('✅ Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Item.deleteMany();
    
    console.log('✅ Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Check for command line argument to decide whether to import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}