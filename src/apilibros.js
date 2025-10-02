const express = require('express');
const fs = require('fs');
const router = express.Router();
const filePath = './Data/data.json';

router.get('/', (req, res, next) => {
  try {
    const libros = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    res.status(200).json(libros);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
