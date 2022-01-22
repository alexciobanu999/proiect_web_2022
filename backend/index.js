import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import { DB_USERNAME, DB_PASSWORD } from './Const.js';
import db from './dbConfig.js';
import User from './entities/User.js'
import Experience from './entities/Experience.js'
import LikeOperator from './Operators.js'

let app = express();
let router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);


//-------------------Creare conexiune cu baza de date----------------------
let conn;

mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
    .then(connection => {
        conn = connection;
        return connection.query("CREATE DATABASE IF NOT EXISTS Proiect");
    })
    .then(() => {
        return conn.end();
    })
    .catch(err => {
        console.warn(err.stack);
    });
//------------------Sfarsit creare conexiune cu baza de date-----------------

//-----------------Adaugare entitati in baza de date------------------------------------------
router.route('/create').get(async (req, res) => {
    try {
        await db.sync();
        res.status(201).json({ message: "Table(s) synced successfully to the database!" })
    } catch (err) {
        console.warn(err.stack)
        res.status(500).json({ message: "Internal server error! Could not sync table(s) to the database!" })
    }
})
//-----------------Sfarsit adaugare entitati in baza de date----------------------------------

//------------------Setare foreign key---------------------------------------------------------
User.hasMany(Experience, { as: "Experiences", foreignKey: "UserId" });
Experience.belongsTo(User, { foreignKey: "UserId" });
//------------------Sfarsit foreign key------------------------------------------------------


//-------------------GET-----------------------
async function getUsers() {
    return await User.findAll({ include: ["Experiences"] });
}
router.route('/users').get(async (req, res) => {
    try {
        return res.json(await getUsers());
    }
    catch (err) {
        console.log(err.message);
    }
})

// async function getUserById(id) {
//     return await User.findByPk(id);
// }
// router.route('/userById/:id').get(async (req, res) => {
//     try {
//         return res.json(await getUserById(req.params.id));
//     }
//     catch (err) {
//         console.log(err.message);
//     }
// })

async function getUser(username) {
    return await User.findOne({ where: username ? { UserName: username } : undefined });
}
router.route('/user/:username').get(async (req, res) => {
    try {
        return res.json(await getUser(req.params.username));
    }
    catch (err) {
        console.log(err.message);
    }
})

async function getExperienceById(id) {
    return await Experience.findByPk(id);
}
router.route('/experience/:id').get(async (req, res) => {
    try {
        return res.json(await getExperienceById(req.params.id));
    }
    catch (err) {
        console.log(err.message);
    }
})

async function getExperiences(username) {
    return await Experience.findAll({ include: [{ model: User, attributes: ['UserName'], where: username ? { UserName: username } : undefined }] });
}
router.route('/experiences').get(async (req, res) => {
    try {
        return res.json(await getExperiences(req.query.username));
    }
    catch (err) {
        console.log(err.message);
    }
})

async function getExperiencesFilter(filterQuery) {
    let whereClause = {};

    if (filterQuery.departure)
        whereClause.ExperienceDeparture = { [LikeOperator]: `%${filterQuery.departure}%` };
    if (filterQuery.arrival)
        whereClause.ExperienceArrival = { [LikeOperator]: `%${filterQuery.arrival}%` };
    if (filterQuery.vehicle)
        whereClause.ExperienceVehicle = { [LikeOperator]: `%${filterQuery.vehicle}%` };

    return await Experience.findAll({
        where: whereClause,
        include: [{ model: User, attributes: ['UserName'] }]
    })
}
router.route('/experiencesFilter').get(async (req, res) => {
    try {
        return res.json(await getExperiencesFilter(req.query));
    }
    catch (err) {
        console.log(err.message);
    }
})
//--------------------Sfarsit GET--------------

//-------------------POST-----------------------
async function createUser(user) {
    return await User.create(user);
}
router.route('/addUser').post(async (req, res) => {
    try {
        return res.status(201).json(await createUser(req.body));
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal server error! Could not insert! Please check constraints!" })
    }
})

async function createExperience(experience) {
    return await Experience.create(experience);
}
router.route('/addExperience').post(async (req, res) => {
    try {
        return res.status(201).json(await createExperience(req.body));
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: "Internal server error! Could not insert! Please check constraints!" })
    }
})
//-------;-------------Sfarsit POST--------------

//-------------------PUT-----------------------
async function updateUser(name, user) {
    if (name !== user.UserName) {
        console.log("Different name given, cannot update");
        return;
    }
    let updatedUser = await getUser(name);
    if (!updatedUser) {
        console.log("No user found with this name");
        return;
    }
    return await updatedUser.update(user);
}
router.route('/updateUser/:username').put(async (req, res) => {
    try {
        return res.json(await updateUser(req.params.username, req.body));
    }
    catch (e) {
        console.log(e.message);
    }
})

async function updateUserPassword(name, details) {
    if (name !== details.UserName) {
        console.log("Different name given, cannot update");
        return;
    }
    let user = await getUser(name);
    if (!user) {
        console.log("No user found with this name");
        return;
    }
    let newUser = JSON.parse(JSON.stringify(user));
    newUser.UserPassword = details.UserPassword;

    return await user.update(newUser);
}
router.route('/updatePassword/:username').put(async (req, res) => {
    try {
        return res.json(await updateUserPassword(req.params.username, req.body));
    }
    catch (e) {
        console.log(e.message);
    }
})

async function updateExperience(id, experience) {
    if (parseInt(id) !== experience.ExperienceId) {
        console.log("Different id given, cannot update");
        return;
    }
    let updatedExperience = await getExperienceById(id);
    if (!updatedExperience) {
        console.log("No experience found with this id");
        return;
    }
    return await updatedExperience.update(experience);
}
router.route('/updateExperience/:id').put(async (req, res) => {
    try {
        return res.json(await updateExperience(req.params.id, req.body));
    }
    catch (e) {
        console.log(e.message);
    }
})
//--------------------Sfarsit PUT--------------

//-------------------DELETE-----------------------
async function deleteUser(username) {
    let userToDelete = await getUser(username);

    if (!userToDelete) {
        console.log('User not found!');
        return;
    }

    return await userToDelete.destroy();
}
router.route('/deleteUser/:username').delete(async (req, res) => {
    try {
        return res.json(await deleteUser(req.params.username));
    }
    catch (e) {
        console.log(e.message);
    }
})

async function deleteExperience(id) {
    let experienceToDelete = await getExperienceById(id);

    if (!experienceToDelete) {
        console.log('Experience not found!');
        return;
    }

    return await experienceToDelete.destroy();
}
router.route('/deleteExperience/:id').delete(async (req, res) => {
    try {
        return res.json(await deleteExperience(req.params.id));
    }
    catch (e) {
        console.log(e.message);
    }
})
//--------------------Sfarsit DELETE--------------

let port = process.env.PORT || 8000;
app.listen(port);
console.log("API is running at " + port);



