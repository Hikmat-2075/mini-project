import express from 'express';
import productController from '../controllers/productController.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.get('/product', authentication, productController.getAllProducts);
router.get('/product/:id', authentication, productController.getProductById);
router.post('/product', authentication, productController.createProduct);
router.put('/product/:id', authentication, productController.updateProduct);
router.delete('/product/:id', authentication, productController.deleteProduct);

export default router;