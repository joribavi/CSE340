import { getAllCategories, getCategorybyId, getCategoriesPerProject,  updateCategoryAssignments } from "../models/categories.js";
import { getProjectDetails} from "../models/projects.js";
import { body, validationResult } from 'express-validator';


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
    res.render('categoryDetails', {title, category});
};


/*

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const categoryPerProject = await getCategoriesPerProject(projectId);

    const title = 'Assign Categories to Projects';
    res.render('assign-categories', {title, projectId,projectDetails, categories, categoryPerProject});
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = parseInt(req.params.projectId,10);
    const selectedCategoryIds = req.body.categories || []; // Ensure it's an array even if no categories are selected
    
    const categoriesIsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds]; // Convert to array if it's a single value

    await assignCategoryToProject(projectId, categoriesIsArray); 
    req.flash('success', 'Categories assigned successfully.');
    res.redirect(`/projects/${projectId}`);
};
*/

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesPerProject(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

/*
const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};
*/

 
const processAssignCategoriesForm = async (req, res) => {
  const projectId = parseInt(req.params.projectId, 10);

  let selected = req.body.categoryIds;
  if (!selected) {
    // when no categories are selected, keep current assignments
    req.flash("info", "No categories selected, keeping current assignments.");
    return res.redirect(`/project/${projectId}`);
  }

  // Normalize selected to an array
  if (!Array.isArray(selected)) {
    selected = [selected];
  }

  // Convert selected category IDs to integers and filter out any invalid values
  const categoryIds = selected.map(id => parseInt(id, 10)).filter(id => !isNaN(id));

  await updateCategoryAssignments(projectId, categoryIds);

  req.flash("success", "Categories updated successfully.");
  res.redirect(`/project/${projectId}`);
};


const showNewCategoryForm = (req, res) => {
    const title = 'New Category';
    res.render('new-category', { title });
};

const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategorybyId(categoryId);
    const title = 'Edit Category';
    res.render('edit-category', { title, category });

};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const { category_name } = req.body;

    await updateCategory(categoryId, category_name);
    req.flash('success', 'Category updated successfully.');
    res.redirect(`/category/${categoryId}`);    
};

const processNewCategoryForm = async (req, res) => {
    const { category_name } = req.body;
    // Here you would typically call a model function to save the new category to the database
    // For example: await createNewCategory(category_name);
    req.flash('success', 'New category created successfully.');
    res.redirect('/categories');

    await createNewCategory(category_name); 
};

const categoryValidationRules = [
    // Validation rules for category_name
    body('category_name')   
        .trim()
        .notEmpty().withMessage('Category name is required.')
        .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters long.'),
];
  



export {categoriesPage, categoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm,categoryValidationRules, showEditCategoryForm, processEditCategoryForm, processNewCategoryForm};