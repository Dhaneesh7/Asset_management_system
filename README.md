
🧾 Asset Management System – Project Description The Asset Management System (AMS) is a full-featured web-based application .It includes functionality to manage assets,vendor,manufacturer,branches,GRNs (Goods Received Notes), and generate Excel-based reports.
🛠️ Tech Stack

| Layer         | Technology                       |
|---------------|----------------------------------|
| Frontend      | React.js, Bootstrap              |
| Backend       | Node.js, Express.js              |
| Database      | MySQL (via Sequelize ORM)        |
| Excel Utility | exceljs                          |        
| API Client    | Axios                            |

Clarification

Although the test email mentioned the MERN stack (which typically includes MongoDB), the attached **project brief** clearly specified:

- A **relational database (MySQL)**
- Use of **Sequelize ORM**
- Relational schema with foreign key constraints and normalization

> note:-  Hence, this project uses **MySQL**, in accordance with the official project brief.

---

-- Folder structure 

Asset_management_system/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
└──assetmanagementsytem.pdf(ER-Diagram)
└──techstack
└──folderstructure
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/734ca4a0-c6ac-4717-b7a7-892a856ef4d7" /># Asset_management_system
 
if you face any problem while checking folder structure goto folderstructure file

* setup instructions 


- 1. Clone the respiratory or download zip file and extract 

- 2. 
cd Asset_management_system


* backend setup 

cd backend
npm install

create an .env file 


example.env

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=asset_db
DB_PORT=3306

PORT=5000


initialize db

npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

/* I used gpt  check how to initialize db */


start the backend 


npm run dev


 * frontend setup 

cd ../frontend
npm install
npm start




 * - Master Modules

 Asset Categories

 Asset Subcategories

 Branches

 Vendors

 Manufacturers

 * - Grn Module
 
Grn list

Grn create Form 


known limitation/ issue 

 - some Page is not that much responsive,a minor alignment issues 

- Doesn't implemented the user authentication 


Developed by-

Dhaneesh v jayakumaran 

GitHub - Dhaneesh7

