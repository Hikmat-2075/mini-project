import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllOrderItems = async () => {
    return await prisma.orderItem.findMany({
        include: {
            order: true,
            product: true,
        },
    });
};

export const getOrderItemById = async (id) => {
    return await prisma.orderItem.findUnique({
        where: { id: Number(id) },
        include: {
            order: true,
            product: true,
        },
    });
};

export const createOrderItem = async ({ orderId, productId, quantity }) => {
    return await prisma.orderItem.create({
        data: {
            orderId,
            productId,
            quantity,
        },
    });
};

export const updateOrderItem = async ({ id, quantity }) => {
    return await prisma.orderItem.update({
        where: { id: Number(id) },
        data: { quantity },
    });
};

export const deleteOrderItem = async (id) => {
    return await prisma.orderItem.delete({
        where: { id: Number(id) },
    });
};

export default {
    getAllOrderItems,
    getOrderItemById,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem,
};
