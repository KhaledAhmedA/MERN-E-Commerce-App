import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";


// create category (admin)
// method POST
// path: http://localhost:5000/api/category
const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ error: "Name is required to create" });
        };

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.json({ error: "Category Already Exists, can't create" });
        };

        const category = await new Category({ name }).save();
        res.json(category);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});



// update category name (admin)
// method PUT
// path: http://localhost:5000/api/category/:id
const updateCategory = asyncHandler(async (req, res) => {

    try {

        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await Category.findOne({ _id: categoryId });

        if (!category) {
            return res.status(404).json({ error: "Category Not Found to update" });
        };

        category.name = name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unexpected Internal Server Error while update" });
    }

});



// delete category (admin)
// method DELETE
// path: http://localhost:5000/api/category/:id
const deleteCategory = asyncHandler(async (req, res) => {

    try {

        const removed = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(removed);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Unexpected Internal Server Error while delete" });
    }

});



// delete category (public)
// method GET
// path: http://localhost:5000/api/category/categories
const listCategory = asyncHandler(async (req, res) => {

    try {

        const allCategories = await Category.find({});
        res.json(allCategories);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }

});




// delete category (public)
// method GET
// path: http://localhost:5000/api/category:id
const readCategory = asyncHandler(async (req, res) => {

    try {

        const category = await Category.findOne({ _id: req.params.id });
        res.json(category);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }

});



export {
    createCategory,
    updateCategory,
    deleteCategory,
    listCategory,
    readCategory
};