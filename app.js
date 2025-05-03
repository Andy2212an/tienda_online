const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Importa las rutas de celulares
const rutaCelular = require('./routes/celular'); // Asegúrate de que la ruta sea correcta

// Iniciar la App
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar "middleware" => "capa de comunicación"
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta raíz para renderizar 'home.ejs'
app.get('/', (req, res) => {
  res.render('home');  // Renderiza home.ejs
});

// Configuración rutas con prefijo /celulares
app.use('/celulares', rutaCelular);  // Usa las rutas definidas en 'celulares.js'

// Servidor Web
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:3000`);
});
