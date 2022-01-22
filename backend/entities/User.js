import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const User = db.define('User', {
    UserId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    UserName: {
        type: Sequelize.STRING,
        validate: {
            len: [3, 25],
            isAlphanumeric: true
        },
        allowNull: false,
        unique: true
    },
    UserPassword: {
        type: Sequelize.STRING,
        validate: {
            len: [8, 30]
        },
        allowNull: false
    },
    UserEmail: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
            len: [5, 50]
        },
        allowNull: false,
        unique: true
    },
    UserLastName: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true,
            len: [1, 50]
        },
        allowNull: false
    },
    UserFirstName: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true,
            len: [1, 50]
        },
        allowNull: false
    },
    UserBio: {
        type: Sequelize.STRING,
        validate: {
            len: [0, 100]
        },
        allowNull: true
    }
});

export default User;