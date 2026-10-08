import db from './db.js'
/* code to be worked on bellow */
const getAllCategories = async() => {
    const query = `
        SELECT category_name FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategorybyId = async(id) => {
    const query = `
        SELECT category_name FROM public.categories WHERE category_id = $1;
    `;

    const result = await db.query(query, [id]);

    return result.rows[0];
}

const getCategoriesPerProject = async(projectId) => {
    const query = `
        SELECT c.category_name, c.category_id FROM public.categories c
        JOIN public.project_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;  

    const result = await db.query(query, [projectId]);

    return result.rows;
}

const getServicesPerCategory = async(categoryId) => {
    const query = `
        SELECT s.service_name FROM public.services s
        JOIN public.service_categories sc ON s.service_id = sc.service_id
        WHERE sc.category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
}

const assignCategoryToProject = async(projectId, categoryId) => {
    const query = `
        INSERT INTO public.project_categories (project_id, category_id)
        VALUES ($1, $2);
    `;
    await db.query(query, [projectId, categoryId]);

   
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // Delete existing category assignments for the project
    const deleteQuery = `
        DELETE FROM public.project_categories WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    for (const categoryId of categoryIds) {
        const parsedId = parseInt(categoryId, 10);
    if (!isNaN(parsedId)) {
      await assignCategoryToProject(projectId, parsedId);
    }

    };

}


export {getAllCategories, getCategorybyId, getCategoriesPerProject, getServicesPerCategory, updateCategoryAssignments};  
