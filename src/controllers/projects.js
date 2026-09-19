import { getAllProjects,getProjectDetails,getProjectsByOrganizationId,getUpcomingProjects } from "../models/projects.js";

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

   res.render('project-detail', { title, project });
};

console.log("controllers/projects.js loaded successfully");
export {projectsPage, showProjectDetailsPage};