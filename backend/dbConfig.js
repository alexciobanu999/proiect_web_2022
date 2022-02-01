import Sequelize from 'sequelize';
import { DB_USERNAME, DB_PASSWORD } from './Const.js'

const db = new Sequelize({
    dialect: 'mysql',
    database: 'Proiect',
    username: DB_USERNAME, //username: 'root'
    password: DB_PASSWORD,  //password: 'root'
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

export default db;