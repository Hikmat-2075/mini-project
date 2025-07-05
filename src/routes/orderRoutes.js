import express from 'express';
import authentication from '../middlewares/authentication.js';
import orderController from '../controllers/orderController.js';

const router = express.Router();

router.get('/order', authentication, orderController.getAllOrder);
router.get('/order/:id', authentication, orderController.getOrderById);
router.post('/order', authentication, orderController.createOrder);
router.put('/order/:id', authentication, orderController.updateOrder);
router.delete('/order/:id', authentication, orderController.deleteOrder);

export default router;