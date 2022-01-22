import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Experience = db.define('Experience', {
    ExperienceId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ExperienceDeparture: {
        type: Sequelize.STRING,
        validate: {
            len: [1, 50],
        },
        allowNull: false
    },
    ExperienceArrival: {
        type: Sequelize.STRING,
        validate: {
            len: [1, 50],
        },
        allowNull: false
    },
    ExperienceVehicle: {
        type: Sequelize.STRING,
        validate: {
            len: [1, 50],
        },
        allowNull: false
    },
    ExperienceHour: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 23
        },
        allowNull: false
    },
    ExperienceMinutes: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 59
        },
        allowNull: true
    },
    ExperienceDurationMinutes: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 300
        },
        allowNull: false
    },
    ExperienceCongestion: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 5
        },
        allowNull: false
    },
    ExperienceDetails: {
        type: Sequelize.STRING,
        validate: {
            len: [1, 200]
        },
        allowNull: true
    },
    ExperienceSatisfaction: {
        type: Sequelize.INTEGER,
        validate: {
            min: 1,
            max: 5
        },
        allowNull: false
    },
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Experience;

