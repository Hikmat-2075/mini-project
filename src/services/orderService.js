import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllOrder = async () => {
    return await prisma.order.findMany({
        include: {
            user: true,
            orderItems: true,
        },
    });
};

export const getOrderById = async (id) => {
    return await prisma.order.findUnique({
        where: { id: Number(id) },
        include: {
            user: true,
            orderItems: true,
        },
    });
};

export const createOrder = async ({ userId, totalPrice, status, orderItems }) => {
    return await prisma.order.create({
        data: {
            userId,
            totalPrice,
            status,
            orderItems: {
            create: orderItems, // orderItems: [{ productId, quantity, price }]
            },
        },
        include: {
            orderItems: true,
        },
    });
};

export const updateOrder = async ({ id, totalPrice, status }) => {
    return await prisma.order.update({
        where: { id: Number(id) },
        data: {
            totalPrice,
            status,
        },
    });
};

export const deleteOrder = async (id) => {
    await prisma.orderItem.deleteMany({
        where: { orderId: Number(id) },
    });

    return await prisma.order.delete({
        where: { id: Number(id) },
    });
};

export default {
    getAllOrder,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};
