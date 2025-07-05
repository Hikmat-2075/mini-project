import productService from "../services/productService.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data produk." });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);
        if (!product) return res.status(404).json({ message: "Produk tidak ditemukan." });
            res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil produk." });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;
        const product = await productService.createProduct({ name, description, price, stock, categoryId });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "Gagal membuat produk." });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, categoryId } = req.body;
        const updated = await productService.updateProduct({ id, name, description, price, stock, categoryId });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Gagal memperbarui produk." });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(id);
        res.json({ message: "Produk berhasil dihapus." });
    } catch (error) {
        res.status(500).json({ error: "Gagal menghapus produk." });
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};