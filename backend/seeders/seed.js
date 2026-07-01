import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Supplier from '../models/Supplier.js';
import RawMaterial from '../models/RawMaterial.js';
import Warehouse from '../models/Warehouse.js';
import Inventory from '../models/Inventory.js';
import Product from '../models/Product.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Supplier.deleteMany();
    await RawMaterial.deleteMany();
    await Warehouse.deleteMany();
    await Inventory.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany([
      { name: 'Admin User', email: 'admin@autoflow.com', password: 'password123', role: 'Admin' },
      { name: 'Procurement Manager', email: 'procurement@autoflow.com', password: 'password123', role: 'Procurement Manager' },
      { name: 'Production Manager', email: 'production@autoflow.com', password: 'password123', role: 'Production Manager' },
    ]);

    const createdSuppliers = await Supplier.insertMany([
      { name: 'Global Steel Corp', email: 'sales@globalsteel.com', phone: '123-456-7890', address: '123 Metal Way, Detroit' },
      { name: 'TechAuto Electronics', email: 'contact@techauto.com', phone: '098-765-4321', address: '456 Silicon Valley, CA' },
    ]);

    const createdRawMaterials = await RawMaterial.insertMany([
      { code: 'RM-001', name: 'High Tensile Steel Sheet', category: 'Metals', unit: 'kg', minimumStock: 1000, pricePerUnit: 2.5, barcode: '100000001' },
      { code: 'RM-002', name: 'Engine Control Unit (ECU)', category: 'Electronics', unit: 'pcs', minimumStock: 50, pricePerUnit: 150, barcode: '100000002' },
      { code: 'RM-003', name: 'Lithium-Ion Battery Cell', category: 'Electronics', unit: 'pcs', minimumStock: 500, pricePerUnit: 45, barcode: '100000003' },
    ]);

    const createdWarehouses = await Warehouse.insertMany([
      { name: 'Main Assembly Warehouse', location: 'Detroit, MI', capacity: 50000, manager: createdUsers[0]._id },
      { name: 'Electronics Storage', location: 'San Jose, CA', capacity: 10000, manager: createdUsers[0]._id },
    ]);

    await Inventory.insertMany([
      { rawMaterial: createdRawMaterials[0]._id, warehouse: createdWarehouses[0]._id, currentStock: 2500, batchNumber: 'B-1001' },
      { rawMaterial: createdRawMaterials[1]._id, warehouse: createdWarehouses[1]._id, currentStock: 150, batchNumber: 'B-1002' },
      { rawMaterial: createdRawMaterials[2]._id, warehouse: createdWarehouses[1]._id, currentStock: 600, batchNumber: 'B-1003' },
    ]);

    await Product.insertMany([
      { code: 'V-EV01', name: 'AutoFlow Model E (Electric Sedan)', category: 'Electric', description: 'Premium electric sedan with 400 miles range.', price: 55000, stockQuantity: 20 },
      { code: 'V-SUV01', name: 'AutoFlow X-Terra (SUV)', category: 'SUV', description: 'Rugged off-road capable family SUV.', price: 42000, stockQuantity: 35 },
    ]);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Supplier.deleteMany();
    await RawMaterial.deleteMany();
    await Warehouse.deleteMany();
    await Inventory.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destroy: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
