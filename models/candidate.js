
const { Sequelize } = require("sequelize")
const db = require("../config/Database.js")

const {DataTypes} = Sequelize;


const Product = {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,  
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.STRING
    },
    
    countReview: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    avgReview: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    
}

module.exports = Product;