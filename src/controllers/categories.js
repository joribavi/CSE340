import { getAllCategories, getCategorybyId, getCategoriesPerProject } from "../models/categories.js";
import { getProjectDetails} from "../models/projects.js";

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


const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const categoryPerProject = await getCategoriesPerProject(projectId);

    const title = 'Assign Categories to Projects';
    res.render('assign-categories', {title, projectDetails, categories, categoryPerProject});
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categories || []; // Ensure it's an array even if no categories are selected
    
    const categoriesIsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds]; // Convert to array if it's a single value

    await assignCategoriesToProject(projectId, categoriesIsArray); 
    req.flash('success', 'Categories assigned successfully.');
    res.redirect(`/projects/${projectId}`);
};

export {categoriesPage, categoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm};