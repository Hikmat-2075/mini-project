import express from 'express';
import categoryController from '../controllers/categoryController.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.get('/category', authentication, categoryController.getAllCategories);
router.get('/category/:id', authentication, categoryController.getCategoriesById);
router.post('/category', authentication, categoryController.createCategory);
router.put('/category/:id', authentication, categoryController.updateCategory);
router.delete('/category/:id', authentication, categoryController.deleteCategory);

export default router;