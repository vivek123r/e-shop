const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});