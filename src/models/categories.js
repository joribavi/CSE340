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
        SELECT c.category_name FROM public.categories c
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

export {getAllCategories, getCategorybyId, getCategoriesPerProject, getServicesPerCategory};  
