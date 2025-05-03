const express = require('express');
const router = express.Router();
const db = require('../config/database');
const multer = require('multer');
const path = require('path');


// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/uploads';
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb('Error: Los archivos deben ser de tipo imagen (jpg, jpeg, png, gif)');
    }
  }
});

// Mostrar todos los celulares con filtros (solo UNA vez definido)
router.get('/', async (req, res) => {
  try {
    let query = `
      SELECT
        C.idcelular,
        M.marca,
        C.modelo,
        C.color,
        C.almacenamiento,
        C.ram,
        C.anio_lanzamiento,
        C.estado,
        C.precio,
        C.imagen
      FROM celulares C
      INNER JOIN marcas M ON C.idmarca = M.idmarca
    `;
    const params = [];

    // Filtrar por categoría (marca)
    if (req.query.category) {
      query += ' WHERE M.marca = ?';
      params.push(req.query.category);
    }

    // Si hay un término de búsqueda
    if (req.query.query) {
      query += (params.length ? ' AND' : ' WHERE') + ' C.modelo LIKE ?';
      params.push('%' + req.query.query + '%');
    }

    // Ordenar por precio (debe ir después de filtros y búsqueda)
    if (req.query.sort) {
      if (req.query.sort === 'price_asc') {
        query += ' ORDER BY C.precio ASC';
      } else if (req.query.sort === 'price_desc') {
        query += ' ORDER BY C.precio DESC';
      }
    }

    const [celulares] = await db.query(query, params);

    // Pasar también los filtros para mantener estado en la vista
    res.render('index', {
      celulares,
      category: req.query.category || '',
      sort: req.query.sort || '',
      query: req.query.query || ''
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los celulares');
  }
});

// Formulario para crear celular
router.get('/create', async (req, res) => {
  try {
    const [datos] = await db.query("SELECT * FROM marcas");
    res.render('create', { marcas: datos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener marcas');
  }
});

// Formulario para editar celular
router.get('/edit/:id', async (req, res) => {
  try {
    const [datos] = await db.query("SELECT * FROM marcas");
    const [registro] = await db.query("SELECT * FROM celulares WHERE idcelular = ?", [req.params.id]);

    if (registro.length > 0)
      res.render('edit', { marcas: datos, celular: registro[0] });
    else
      res.redirect('/celulares');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los datos para editar');
  }
});

// Guardar nuevo celular
router.post('/create', upload.single('imagen'), async (req, res) => {
  try {
    const { marcas, modelo, color, almacenamiento, ram, anio_lanzamiento, estado, precio } = req.body;
    const imagen = req.file ? req.file.filename : null;

    if (!marcas || !modelo || !precio) {
      return res.status(400).send('Faltan campos requeridos');
    }

    await db.query(
      `INSERT INTO celulares (idmarca, modelo, color, almacenamiento, ram, anio_lanzamiento, estado, precio, imagen) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [marcas, modelo, color, almacenamiento, ram, anio_lanzamiento, estado, precio, imagen]
    );
    res.redirect('/celulares');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar el celular');
  }
});

// Actualizar celular
router.post('/edit/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { marcas, modelo, color, almacenamiento, ram, anio_lanzamiento, estado, precio } = req.body;
    let imagen = req.body.imagen;

    if (req.file) {
      imagen = req.file.filename;
    }

    if (!marcas || !modelo || !precio) {
      return res.status(400).send('Faltan campos requeridos');
    }

    await db.query(
      `UPDATE celulares SET idmarca=?, modelo=?, color=?, almacenamiento=?, ram=?, anio_lanzamiento=?, estado=?, precio=?, imagen=? 
       WHERE idcelular=?`,
      [marcas, modelo, color, almacenamiento, ram, anio_lanzamiento, estado, precio, imagen, req.params.id]
    );
    res.redirect('/celulares');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el celular');
  }
});

// Eliminar celular
router.post('/delete/:id', async (req, res) => {
  try {
    // Si deseas eliminar la imagen también, puedes agregar esta lógica:
    const [celular] = await db.query("SELECT imagen FROM celulares WHERE idcelular = ?", [req.params.id]);
    if (celular.length > 0 && celular[0].imagen) {
      const fs = require('fs');
      const path = require('path');
      const imagenPath = path.join(__dirname, '../public/uploads', celular[0].imagen);

      if (fs.existsSync(imagenPath)) {
        fs.unlinkSync(imagenPath); // Eliminar la imagen
      }
    }

    // Eliminar el registro del celular
    await db.query("DELETE FROM celulares WHERE idcelular = ?", [req.params.id]);
    res.redirect('/celulares');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el celular');
  }
});

// Eliminar celular
router.get('/delete/:id', async (req, res) => {
  try {
    await db.query("DELETE FROM celulares WHERE idcelular = ?", [req.params.id]);
    res.redirect('/celulares');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el celular');
  }
});

module.exports = router;
