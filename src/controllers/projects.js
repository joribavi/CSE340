import { getAllProjects,getProjectDetails,getProjectsByOrganizationId,getUpcomingProjects, createProject, updateProject } from "../models/projects.js";
import { getCategoriesPerProject } from "../models/categories.js";
import { getAllOrganizations } from "../models/organizations.js"; 
import { body, validationResult } from 'express-validator';

const projectValidationRules = [
  body('title')
                                             .notEmpty()
                                             .trim()
                                             .isLength({ min: 3, max: 200 })
                                             .withMessage('Title must be between 3 and 200 characters'),
   body('description')
                                             .notEmpty()
                                             .trim()
                                             .isLength({  max: 1000 })
                                             .withMessage('Description must be max 1000 characters'),
   body('date')
                                            .notEmpty()
                                            .isISO8601()
                                            .withMessage('Date must be a valid date'),
   body('location')
                                            .notEmpty()
                                            .trim()
                                            .isLength({ min: 3, max: 200 })
                                            .withMessage('Location must be between 3 and 200 characters'),
   body('organization_id')
                                            .notEmpty()
                                            .isInt()
                                            .withMessage('Organization ID must be a valid integer')   
]

const NUMBER_OF_UPCOMING_PROJECTS = 5; // Number of upcoming projects to fetch
const projectsPage = async (req, res) => {
   const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS); // Fetch upcoming projects
   console.log(projects);

   const title = 'Upcoming Service Projects';
   res.render('projects', {title, projects});


};


const showProjectDetailsPage = async (req, res) => {
   const { id } = req.params;
   const project = await getProjectDetails(id);
   const title = 'Project Details';
   const categories = await getCategoriesPerProject(id); // Fetch categories for the project

   res.render('projectDetails', { title, project, categories });
};

const showNewProjectForm = async (req, res) => {
   const organizations = await getAllOrganizations();
   const title = 'Add a New Service Project';
   res.render('new-project', { title, organizations });
};


const processNewProjectForm = async (req, res) => {
    const errors = validationResult(req);

   if (!errors.isEmpty()) {
   errors.array().forEach(error => {
      req.flash('error', error.msg);
   });

   return res.redirect('/new-project');
  }

   const { title, description, date, location, organization_id } = req.body;

   try {
      const projectId = await createProject(title, description, date, location, organization_id);
      req.flash('success', 'Project added successfully!');
      res.redirect(`/project/${projectId}`);
   }
   catch (error) {
      console.error('Error creating project:', error);
      req.flash('error', 'Failed to create project. Please try again.');
      res.redirect('/new-project');
   }
   

};

const showEditProjectForm = async (req, res) => {
   const { id } = req.params; 
   const project = await getProjectDetails(id);
   const organizations = await getAllOrganizations();
   const title = 'Edit Service Project';
   res.render('edit-project', { title, project, organizations });
};

const processEditProjectForm = async (req, res) => {
   const errors = validationResult(req);  
   if (!errors.isEmpty()) {
      errors.array().forEach(error => {
         req.flash('error', error.msg);
      });
   return res.redirect(`/edit-project/${req.params.id}`);
   }
   
   const { title, description, date, location, organization_id } = req.body;

   try {    
      const projectId = req.params.id;
      await updateProject(projectId, title, description, date, location, organization_id);
      req.flash('success', 'Project updated successfully!');
      res.redirect(`/project/${projectId}`);
   }
   catch (error) {
      console.error('Error updating project:', error);
      req.flash('error', 'Failed to update project. Please try again.');
      res.redirect(`/edit-project/${req.params.id}`);
   }
};



export {projectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidationRules, showEditProjectForm, processEditProjectForm};