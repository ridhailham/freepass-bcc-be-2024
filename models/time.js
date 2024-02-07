const { Sequelize } = require("sequelize");
const db = require("../config/Database.js");

const { DataTypes } = Sequelize;

const Time = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    start_time: {
        type: DataTypes.DATE, 
        allowNull: false,
    },
    end_time: {
        type: DataTypes.DATE, 
        allowNull: false,
    }
};

module.exports = Time;
