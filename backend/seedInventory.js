const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');
require('dotenv').config();

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Seeding'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

async function seedDatabase() {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const clothesBaseDir = path.join(__dirname, 'items/clothes');
    const categories = fs.readdirSync(clothesBaseDir);

    const products = [];

    categories.forEach(category => {
      const categoryDir = path.join(clothesBaseDir, category);
      const files = fs.readdirSync(categoryDir);

      files.forEach(file => {
        const imageUrl = `http://localhost:${PORT}/items/clothes/${category}/${file}`;
        const productName = file.replace(/\.(jpg|jpeg|webp|png)$/i, '');
        
        products.push({
          name: productName,
          category: category,
          price: Math.floor(Math.random() * 2000) + 500, // Random price between 500-2500
          image: imageUrl,
          stock: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
          description: `${productName} - High quality ${category} clothing item`
        });
      });
    });

    // Insert all products
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products into the database`);
    
    // Display summary by category
    const summary = {};
    products.forEach(p => {
      summary[p.category] = (summary[p.category] || 0) + 1;
    });
    console.log('\n📊 Summary by category:');
    Object.entries(summary).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} items`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
}

seedDatabase();
