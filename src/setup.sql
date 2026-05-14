/* SETUP IN CASE CREATING TABLE AGAIN ON 
RENDER IS NEEDED 
*/

CREATE TABLE Organizations(
   organization_id SERIAL PRIMARY KEY,
   Name VARCHAR(150)NOT NULL,
   Description VARCHAR(500) NOT NULL,
   Contact_email VARCHAR(255) NOT NULL,
   Logo_FileName VARCHAR(255) NOT NULL 
);

--Add info to the table
INSERT INTO Organizations (Name, Description, Contact_email, Logo_FileName) 
VALUES
('BrightFuture Builders','A nonprofit focused on improving community infrastructure through sustainable construction projects.','info@brightfuturebuilders.org','brightfuture-logo.png'),
('GreenHarvest Growers','An urban farming collective promoting food sustainability and education in local neighborhoods.','contact@greenharvest.org','greenharvest-logo.png'), 
('UnityServe Volunteers','A volunteer coordination group supporting local charities and service initiatives.','hello@unityserve.org','unityserve-logo.png');

--checking data found on the table 
select * from Organizations 


--creating table projects: 
CREATE TABLE projects (
project_id SERIAL PRIMARY KEY,
organization_id INTEGER NOT NULL REFERENCES Organizations(organization_id),
project_title VARCHAR(150) NOT NULL,
description VARCHAR(500) NOT NULL,
location VARCHAR(150) NOT NULL,
project_date DATE
);

--inserting data into projects table: 
-- Proyectos para BrightFuture Builders (organization_id = 1)
INSERT INTO projects (organization_id, project_title, description, location, project_date) VALUES
(1, 'Community Center Roof Repair', 'Replace damaged roof and install solar panels at the downtown community hub.', 'Springfield, IL', '2025-03-15'),
(1, 'Park Accessibility Ramp', 'Build wheelchair-accessible ramps and pathways in Central Park.', 'Springfield, IL', '2025-04-10'),
(1, 'Affordable Housing Framing', 'Assist in framing new affordable housing units for low-income families.', 'Lincoln, NE', '2025-05-01'),
(1, 'School Playground Renovation', 'Repair and repaint playground equipment at Jefferson Elementary.', 'Springfield, IL', '2025-06-20'),
(1, 'Community Garden Shed', 'Construct a tool shed and rainwater collection system for the community garden.', 'Springfield, IL', '2025-07-12'),
(1, 'Shelter Energy Efficiency Upgrade', 'Install insulation and LED lighting at a local homeless shelter.', 'Springfield, IL', '2025-08-05');

-- Proyectos para GreenHarvest Growers (organization_id = 2)
INSERT INTO projects (organization_id, project_title, description, location, project_date) VALUES
(2, 'Urban Rooftop Farm', 'Install raised beds and irrigation on the rooftop of a downtown parking garage.', 'Chicago, IL', '2025-04-05'),
(2, 'School Garden Workshop', 'Build raised garden beds and host workshops for students at Washington Middle School.', 'Evanston, IL', '2025-05-18'),
(2, 'Composting Pilot Program', 'Set up community composting sites and provide training to residents.', 'Oak Park, IL', '2025-06-01'),
(2, 'Food Forest Planting', 'Plant fruit trees and perennial vegetables in a vacant lot to create a public food forest.', 'Gary, IN', '2025-07-22'),
(2, 'Hydroponic Greenhouse Construction', 'Build a small hydroponic greenhouse for year-round leafy green production.', 'Milwaukee, WI', '2025-08-10'),
(2, 'Seed Library Launch', 'Create a free seed lending library at the local public library.', 'Chicago, IL', '2025-09-01');

-- Proyectos para UnityServe Volunteers (organization_id = 3)
INSERT INTO projects (organization_id, project_title, description, location, project_date) VALUES
(3, 'Beach Cleanup Day', 'Organize volunteers to remove debris from Lake Michigan shoreline.', 'St. Joseph, MI', '2025-06-05'),
(3, 'Senior Center Meal Delivery', 'Recruit drivers to deliver hot meals to homebound seniors.', 'South Bend, IN', '2025-03-20'),
(3, 'Book Drive & Library Sorting', 'Collect and sort donated books for underfunded school libraries.', 'Kalamazoo, MI', '2025-04-25'),
(3, 'Winter Coat Distribution', 'Collect, clean, and distribute coats to homeless shelters.', 'Fort Wayne, IN', '2025-10-15'),
(3, 'Trail Maintenance Day', 'Clear brush and repair footbridges on the regional hiking trail.', 'Holland, MI', '2025-09-12'),
(3, 'Blood Drive Coordination', 'Organize a community blood drive with the local Red Cross.', 'South Bend, IN', '2025-11-08');