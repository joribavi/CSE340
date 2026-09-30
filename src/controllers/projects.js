import { getAllProjects,getProjectDetails,getProjectsByOrganizationId,getUpcomingProjects, createProject } from "../models/projects.js";
import { getCategoriesPerProject } from "../models/categories.js";
import { getAllOrganizations } from "../models/organizations.js"; 

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
export {projectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm};