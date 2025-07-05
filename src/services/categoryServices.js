import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllCategories = async() => {
    return await prisma.category.findMany();
};

const getCategoriesById = async (id) => {
    return await prisma.category.findUnique({
        where: { id },
    });
};

const createCategory = async ({name, description}) => {
    return await prisma.category.create({
        data: { name, description },
    });
};

const updateCategory = async (id, { name, description }) => {
    try {
        return await prisma.category.update({
            where: { id },
            data: { name, description },
        });
    } catch (error) {
        return null;
    }
};

const deleteCategory = async (id) => {
    try {
        await prisma.category.delete({
            where: { id },
        });
        return true;
    } catch (error) {
        return false;
    }
}

export default { 
    getAllCategories,
    getCategoriesById,
    createCategory,
    updateCategory,
    deleteCategory,
};