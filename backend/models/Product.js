const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'classy', 'modern', 'pants'
  price: { type: Number, required: true },
  image: { type: String, required: true }, // URL path to image
  stock: { type: Number, default: 10 },    // Inventory count
  description: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
