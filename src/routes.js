import express from 'express';

import { homePage } from './controllers/index.js';
import { organizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { projectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidationRules, processEditProjectForm, showEditProjectForm } from './controllers/projects.js';
import { categoriesPage, categoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, categoryValidationRules, showNewCategoryForm, showEditCategoryForm, processEditCategoryForm, processNewCategoryForm} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';




const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);



// error-handling routes
router.get('/test-error', testErrorPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for project details page
router.get('/project/:id', showProjectDetailsPage);

router.get('/category/:id', categoryDetailsPage); // Route for category details page

router.get('/edit-organization/:id', showEditOrganizationForm); // Route for editing an organization

router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm); // Route to handle editing an organization submission

router.get('/new-project', showNewProjectForm); // Route for new project page
router.post('/new-project', projectValidationRules, processNewProjectForm); // Route to handle new project form submission  

router.get('/projects/:projectId', showAssignCategoriesForm); // Route for assigning categories to a project
router.post('/projects/:projectId', processAssignCategoriesForm); // Route to handle assigning categories to a project

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Route for editing a project
router.get('/edit-project/:id', showEditProjectForm); // Route for editing a project
router.post('/edit-project/:id', projectValidationRules, processEditProjectForm); // Route to handle editing a project submission

// Routes for editing a category
router.get('/edit-category/:id', showEditCategoryForm); // Route for editing a category
router.post('/edit-category/:id', categoryValidationRules, processEditCategoryForm); // Route to handle editing a category submission

router.get('/new-category', showNewCategoryForm); // Route for new category page
router.post('/new-category', categoryValidationRules, processNewCategoryForm); // Route to handle new category form submission

export {router}