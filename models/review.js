
const { Sequelize } = require("sequelize")
const db = require("../config/Database.js")

const User = require("./user.js");
const Posting = require("./posting.js");
// const Product = require("./product.js");
const {DataTypes} = Sequelize;


const Review = {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,  
    },
    userId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    postingId:{
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Posting,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        reference: {
            model: User,
            key: 'id'
        }
    },
    // productId:{
    //     type: DataTypes.UUID,
    //     allowNull: false,
    //     references: {
    //         model: Product,
    //         key: 'id'
    //     }
    // },
    
    // point: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         max: 10, 
    //         min: 0,  
    //     }
    // },
    comment:{
        type: DataTypes.TEXT,
        allowNull: false
    }
}

module.exports = Review;