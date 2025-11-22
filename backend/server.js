const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static files from BOTH directories
app.use('/images', express.static(path.join(__dirname, 'item-lists')));
app.use('/items', express.static(path.join(__dirname, 'items')));

// Endpoint to get pants images
// General endpoint to get images for any clothes category
app.get('/api/items/clothes', (req, res) => {
  const clothesBaseDir = path.join(__dirname, 'items/clothes');

  fs.readdir(clothesBaseDir, (err, categories) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read clothes directory' });
    }

    const clothesData = {};

    let pending = categories.length;
    if (pending === 0) {
      return res.json(clothesData); // Empty if no categories
    }

    categories.forEach(category => {
      const categoryDir = path.join(clothesBaseDir, category);

      fs.readdir(categoryDir, (err, files) => {
        if (err) {
          clothesData[category] = []; // Just return empty array for this category
        } else {
          clothesData[category] = files.map(file => 
            `http://localhost:${PORT}/items/clothes/${category}/${file}`
          );
        }

        pending -= 1;
        if (pending === 0) {
          res.json(clothesData);
        }
      });
    });
  });
});

// Endpoint to get item-list images (if needed)
app.get('/item-lists', (req, res) => {
  const itemListsDir = path.join(__dirname, 'item-lists');
  fs.readdir(itemListsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read item-lists directory' });
    }
    const imageUrls = files.map(file => `http://localhost:${PORT}/images/${file}`);
    res.json(imageUrls);
  });
});

// ========== INVENTORY API ROUTES ==========

// GET all products or by category
app.get('/api/inventory', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// GET single product by ID
app.get('/api/inventory/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST create new product
app.post('/api/inventory', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// PUT update product (including stock)
app.put('/api/inventory/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// DELETE product
app.delete('/api/inventory/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});