import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
    return await prisma.product.findMany({
        include: {
            category: true,
            orderItems: true,
        },
    });
};

export const getProductById = async (id) => {
    return await prisma.product.findUnique({
        where: { id: Number(id) },
        include: {
            category: true,
            orderItems: true,
        },
    });
};

export const createProduct = async ({ name, description, price, stock, categoryId }) => {
    return await prisma.product.create({
        data: {
        name,
        description,
        price,
        stock,
        categoryId,
        },
    });
};

export const updateProduct = async ({ id, name, description, price, stock, categoryId }) => {
    return await prisma.product.update({
        where: { id: Number(id) },
        data: {
            name,
            description,
            price,
            stock,
            categoryId,
        },
    });
};

export const deleteProduct = async (id) => {
    return await prisma.product.delete({
        where: { id: Number(id) },
    });
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};