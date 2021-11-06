const { getConnection, sql, querys } = require('../database');

const createNewProduct = async (req, res) => {
  const { referencia, nombre, descripcion, tipo, estado, clima, genero } =
    req.body;
  if (
    typeof nombre === 'undefined' ||
    typeof tipo === 'undefined' ||
    typeof referencia === 'undefined' ||
    typeof estado === 'undefined'
  ) {
    return res
      .status(400)
      .json({ message: 'Nombre, tipo, referencia, estado' });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input('referencia', sql.VarChar, referencia)
      .input('nombre', sql.VarChar, nombre)
      .input('descripcion', sql.VarChar, descripcion)
      .input('tipo', sql.VarChar, tipo)
      .input('estado', sql.Bit, estado)
      .input('clima', sql.VarChar, clima)
      .input('genero', sql.VarChar, genero)
      .query(querys.createNewUser);
    res.json({
      referencia,
      nombre,
      descripcion,
      tipo,
      estado,
      clima,
      genero,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const { recordset } = await pool.request().query(querys.getAllUsers);
    res.json({ Users: recordset });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', id)
      .query(querys.getUserById);
    if (result.recordset.length === 0) {
      return res.json({ message: 'Usuario no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', id)
      .query(querys.deleteUserById);
    if (result.rowsAffected[0] === 0) {
      return res.json({ message: 'Usuario no encontrado' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
module.exports = {
  getProducts,
  createNewProduct,
  getProductById,
  deleteProductById,
};
