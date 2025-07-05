import categoryService from "../services/categoryServices.js";

const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error getCategories:', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const getCategoriesById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await categoryService.getCategoriesById(Number(id));
        if(!category){
            return res.status(404).json({
                message: 'Category Not Found',
            });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            message: 'Internal Server Error',
        });
    }
};

const createCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newCategory = await categoryService.createCategory({ name, description });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category; ', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params; 
    const { name, description } = req.body;

    const updateData = {};
    if(name !== undefined){
        updateData.name = name;
    }
    if(description !== undefined){
        updateData.description = description;
    }

    try {
        const updatedCategory = await categoryService.updateCategory(Number(id), updateData);
        if(!updatedCategory){
            return res.status(404).json({
                message: 'Category not found',
            });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await categoryService.deleteCategory(Number(id));
        if(!deleted){
            return res.status(404).json({message: 'Category not found'});
        }
        res.status(200).json({
            message: 'Category deleted',
        });
    } catch (error) {
        console.error('Error: ', error);
        res.status(500).json({message: 'Internal Server Error'});
    }
};

export default {
    getAllCategories,
    getCategoriesById,
    createCategory,
    updateCategory,
    deleteCategory,
};