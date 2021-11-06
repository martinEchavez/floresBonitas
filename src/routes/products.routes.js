const { Router } = require('express');
const {
  getProducts,
  createNewProduct,
  getProductById,
  deleteProductById,
} = require('../controllers/products.controller');

const router = Router();

router.post('/products', createNewProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.delete('/products/:id', deleteProductById);

module.exports = router;
