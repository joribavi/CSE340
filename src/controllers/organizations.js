import { getAllOrganizations } from "../models/organizations.js";

const organizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    console.log(organizations);
    
    const title = 'Our Partners Organizations';
    res.render('organizations' , {title, organizations});
};


export {organizationsPage}