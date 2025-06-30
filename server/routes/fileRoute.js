const express = require('express');
const path = require('path');

const router = express.Router();

// GET /file/:filename
router.get('/file/:filename', (req, res) => {
  const { filename } = req.params;

  // Adjust this path based on your project structure
  const filePath = path.join(__dirname, '..', 'uploads', 'resumes', filename);
    console.log(filePath)
  res.sendFile(filePath, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
  });
});

module.exports = router;
