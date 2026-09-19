import express from 'express';

import { homePage } from './controllers/index.js';
import { organizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js';
import { projectsPage, showProjectDetailsPage } from './controllers/projects.js';
import { categoriesPage, categoryDetailsPage} from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';




const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);

// error-handling routes
router.get('/test-error', testErrorPage);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for project details page
router.get('/project/:id', showProjectDetailsPage);

router.get('/category/:id', categoryDetailsPage); // Route for category details page



export {router};