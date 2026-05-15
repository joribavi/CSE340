import db from './db.js'
/* code to be worked on bellow */
const getAllCategories = async() => {
    const query = `
        SELECT category_name FROM public.categories;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllCategories}  