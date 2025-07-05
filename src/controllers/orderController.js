import orderService from "../services/orderService.js";

export const getAllOrder = async (req, res) => {
    try {
        const orders = await orderService.getAllOrder();
        res.json(orders);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: "Gagal mengambil data pesanan." });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderById(id);
        if (!order) return res.status(404).json({ message: "Pesanan tidak ditemukan." });
            res.json(order);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: "Gagal mengambil pesanan." });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { userId, totalPrice, status, orderItems } = req.body;
        const order = await orderService.createOrder({ userId, totalPrice, status, orderItems });
        res.status(201).json(order);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: "Gagal membuat pesanan." });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalPrice, status } = req.body;
        const updated = await orderService.updateOrder({ id, totalPrice, status });
        res.json(updated);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: "Gagal memperbarui pesanan." });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await orderService.deleteOrder(id);
        res.json({ message: "Pesanan berhasil dihapus." });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({ error: "Gagal menghapus pesanan." });
    }
}; 

export default {
    getAllOrder,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
