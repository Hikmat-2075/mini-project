import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async(userData) => {
    return await prisma.user.create({
        data: userData,
    });
};

const findUserByUsername = async (username) => {
    return await prisma.user.findFirst({
        where: { username }
    });
};

const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email }
    });
};

export default { createUser, findUserByUsername, findUserByEmail };
