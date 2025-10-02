const express = require('express');
const fs = require('fs');
const { validate: uuidValidate } = require('uuid');
const router = express.Router();
const filePath = './Data/data.json';

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!uuidValidate(id)) return res.status(400).json({ error: "ID inválido" });

  const libros = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const libro = libros.find(l => l.id === id);
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

  res.status(200).json(libro);
});

module.exports = router;
