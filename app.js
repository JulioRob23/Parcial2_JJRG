const express = require('express');
const errorHandler = require('./Middleware/error'); 

const api1 = require('./src/apilibros');
const api2 = require('./src/apilibrosid');
const api3 = require('./src/apipostlibros');
const api4 = require('./src/apidelete');

const app = express();
app.use(express.json());

app.use('/api/libros', api1); 
app.use('/api/libros', api2); 
app.use('/api/libros', api3); 
app.use('/api/libros', api4); 

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
