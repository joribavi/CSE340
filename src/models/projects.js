import db from './db.js'
/* code to be worked on bellow */
const getAllProjects = async() => {
    const query = `
        SELECT p.*,
        o.name AS organization_name
        FROM projects p 
        INNER JOIN organizations o ON p.organization_id = o.organization_id
    `;

    const result = await db.query(query);

    return result.rows;
}
const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM projects
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT p.project_id,
           p.project_title,
           p.description,
           p.project_date,
           p.location,
           p.organization_id,
           o.name AS organization_name
    FROM projects p 
    INNER JOIN organizations o ON p.organization_id = o.organization_id
    ORDER BY p.project_date ASC
    LIMIT $1;
  `;
   //to verify 
    const queryParams = [number_of_projects];
    const result = await db.query(query, queryParams);
    return result.rows;
    
}

const getProjectDetails = async (id) => {
  const query = `
    SELECT p.project_id,
           p.project_title,
           p.description,
           p.project_date,
           p.location,
           p.organization_id,
           o.name AS organization_name
    FROM projects p 
    INNER JOIN organizations o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;
  
  const queryParams = [id];
  const result = await db.query(query, queryParams);
  
  return result.rows[0];
};

export {getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails}  