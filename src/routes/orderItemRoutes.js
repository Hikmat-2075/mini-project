import express from 'express';
import orderItemController from '../controllers/orderItemController.js';
import authentication from '../middlewares/authentication.js';

const router = express.Router();

router.get('/orderItem', authentication, orderItemController.getAllOrderItems);
router.get('/orderItem/:id', authentication, orderItemController.getOrderItemById);
router.post('/orderItem', authentication, orderItemController.createOrderItem);
router.put('/orderItem/:id', authentication, orderItemController.updateOrderItem);
router.delete('/orderItem/:id', authentication, orderItemController.deleteOrderItem);

export default router;