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

export {getAllProjects}  