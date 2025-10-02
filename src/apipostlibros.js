const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const filePath = './Data/data.json';

router.post('/', (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author) return res.status(400).json({ error: "Faltan campos obligatorios" });
  if (title.length < 2 || title.length > 100) return res.status(400).json({ error: "Título inválido" });
  if (author.length < 5) return res.status(400).json({ error: "Author inválido" });
  if (year !== undefined && (typeof year !== "number" || year < 1000 || year > new Date().getFullYear())) {
    return res.status(400).json({ error: "Año inválido" });
  }

  const libros = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (libros.some(l => l.title === title && l.year === year)) return res.status(409).json({ error: "Libro duplicado" });

  const newBook = { id: uuidv4(), title, author, year };
  libros.push(newBook);
  fs.writeFileSync(filePath, JSON.stringify(libros, null, 2));

  res.status(201).json(newBook);
});

module.exports = router;
