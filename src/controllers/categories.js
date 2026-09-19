import { getAllCategories } from "../models/categories.js";

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    console.log(categories); 

    const title = 'Categories';
    res.render('categories', {title, categories});
};

const categoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategorybyId(categoryId); 
    const title = 'Category Details';
    res.render('category-details', {title, category});
};



export {categoriesPage, categoryDetailsPage};