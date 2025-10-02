const express = require('express');
const fs = require('fs');
const { validate: uuidValidate } = require('uuid');
const router = express.Router();
const filePath = './Data/data.json';

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!uuidValidate(id)) return res.status(400).json({ error: "ID inválido" });

  const libros = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return res.status(404).json({ error: "Libro no encontrado" });

  const deleted = libros.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(libros, null, 2));

  res.status(200).json({ message: "Libro eliminado correctamente", libro: deleted[0] });
});

module.exports = router;
