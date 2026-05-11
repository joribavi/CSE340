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