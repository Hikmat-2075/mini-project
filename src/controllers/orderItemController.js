import orderItemService from "../services/orderItemService.js";

export const getAllOrderItems = async (req, res) => {
    try {
        const items = await orderItemService.getAllOrderItems();
        res.json(items);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: "Gagal mengambil data order item." });
    }
};

export const getOrderItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await orderItemService.getOrderItemById(id);
        if (!item) return res.status(404).json({ message: "Order item tidak ditemukan." });
            res.json(item);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: "Gagal mengambil order item." });
    }
};

export const createOrderItem = async (req, res) => {
    try {
        const { orderId, productId, quantity } = req.body;
        const item = await orderItemService.createOrderItem({ orderId, productId, quantity });
        res.status(201).json(item);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: "Gagal membuat order item." });
    }
};

export const updateOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updated = await orderItemService.updateOrderItem({ id, quantity });
        res.json(updated);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: "Gagal memperbarui order item." });
    }
};

export const deleteOrderItem = async (req, res) => {
    try {
        const { id } = req.params;
        await orderItemService.deleteOrderItem(id);
        res.json({ message: "Order item berhasil dihapus." });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: "Gagal menghapus order item." });
    }
};

export default {
    getAllOrderItems,
    getOrderItemById,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
};
