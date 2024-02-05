
const Role = require('./role.js');
const User = require('./user.js');
const Posting = require('./candidate.js')
const Product = require('./product.js')
const Profile = require('./profile.js')
const Review = require('./review.js')
const db = require('../config/Database.js');
const bcrypt = require('bcryptjs');



// const category = db.define("Category", Category, {
//     tableName: "categories",
//     underscored: true,
//   }
// );

const role = db.define("Role", Role, {
    tableName: "roles",
    underscored: true,
  }
);

const user = db.define("User", User, {
    tableName: "users",
    underscored: true,
  }
);


role.hasMany(user);
user.belongsTo(role, {foreignKey: 'role_id'});


// const product = db.define("Product", Product, {
//     tableName: "products",
//     underscored: true,
//   }
// );


const posting = db.define("Posting", Posting, {
  tableName: "postings",
  underscored: true,
}
);



// ONE TO MANY
// category.hasMany(product);
// product.belongsTo(category, {foreignKey: 'categoryId'});


const profile = db.define("Profile", Profile, {
  tableName: "profiles",
  underscored: true,
}
);


user.hasOne(profile);
profile.belongsTo(user, {foreignKey: 'userId'});


const review = db.define("Review", Review, {
  tableName: "reviews",
  underscored: true,
}
);

// MANY TO MANY
// user.belongsToMany(product, { through: review });
// product.belongsToMany(user, { through: review });

// user.hasMany(product);
// product.belongsTo(user, {foreignKey: 'userId'});


// MANY TO MANY
user.belongsToMany(posting, { through: review });
posting.belongsToMany(user, { through: review });

user.hasMany(posting);
posting.belongsTo(user, {foreignKey: 'userId'});




async function initial() {
    const userRole = await role.findOne({ where: { name: "admin" } });
    user.create({
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456', 8),
        role_id: userRole.id,

    })
}  


db.sync()
.then(() => {
    // initial();
    
    console.log("database connected");

}).catch(() => {
    console.log("database failed");
})

module.exports = { db,  user, role, posting, profile, review };