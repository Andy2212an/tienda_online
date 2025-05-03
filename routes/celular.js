const express = require('express'); // Framework
const router = express.Router(); // Rutas
const db = require('../config/database'); // Acceso BD

// Mostrar todos los celulares
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT
        C.idcelular,
        M.marca,
        C.modelo,
        C.color,
        C.almacenamiento,
        C.ram,
        C.anio_lanzamiento,
        C.estado
      FROM celulares C
      INNER JOIN marcas M ON C.idmarca = M.idmarca
    `;
    const [celulares] = await db.query(query);
    res.render('index', { celulares });
  } catch (error) {
    console.error(error);
  }
});

// Mostrar formulario para crear celular
router.get('/create', async (req, res) => {
  try {
    const [datos] = await db.query("SELECT * FROM marcas");
    res.render('create', { marcas: datos });
  } catch (error) {
    console.error(error);
  }
});

// Mostrar formulario para editar celular
router.get('/edit/:id', async (req, res) => {
  try {
    const [datos] = await db.query("SELECT * FROM marcas");
    const [registro] = await db.query("SELECT * FROM celulares WHERE idcelular = ?", [req.params.id]);

    if (registro.length > 0)
      res.render('edit', { marcas: datos, celular: registro[0] });
    else
      res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

// Guardar nuevo celular
router.post('/create', async (req, res) => {
  try {
    const { marcas, modelo, color, almacenamiento, ram, anio_lanzamiento, estado } = req.body;
    await db.query(
      `INSERT INTO celulares (idmarca, modelo, color, almacenamiento, ram, anio_lanzamiento, estado) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [marcas, modelo, color, almacenamiento, ram, anio_lanzamiento, estado]
    );
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

// Actualizar celular
router.post('/edit/:id', async (req, res) => {
  try {
    const { marcas, modelo, color, almacenamiento, ram, anio_lanzamiento, estado } = req.body;
    await db.query(
      `UPDATE celulares SET idmarca=?, modelo=?, color=?, almacenamiento=?, ram=?, anio_lanzamiento=?, estado=? WHERE idcelular=?`,
      [marcas, modelo, color, almacenamiento, ram, anio_lanzamiento, estado, req.params.id]
    );
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

// Eliminar celular
router.get('/delete/:id', async (req, res) => {
  try {
    await db.query("DELETE FROM celulares WHERE idcelular = ?", [req.params.id]);
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
