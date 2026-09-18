import { getAllProjects,getProjectDetails,getProjectsByOrganizationId,getUpcomingProjects } from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5; // Number of upcoming projects to fetch
const projectsPage = async (req, res) => {
   const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS); // Fetch upcoming projects
   console.log(projects);

   const title = 'Service Projects';
   res.render('projects', {title, projects});


};

export {projectsPage};