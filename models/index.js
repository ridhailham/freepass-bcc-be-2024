
const Role = require('./role.js');
const User = require('./user.js');
const Posting = require('./posting.js')
const Voting = require('./voting.js')
const Profile = require('./profile.js')
const Review = require('./review.js')
const Time = require('./time.js')

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
user.belongsTo(role, { foreignKey: 'role_id' });


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
profile.belongsTo(user, { foreignKey: 'userId' });


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
posting.belongsTo(user, { foreignKey: 'userId' });


const voting = db.define("Voting", Voting, {
  tableName: "votings",
  underscored: true,
}
);

user.hasOne(voting);
voting.belongsTo(user, {foreignKey: 'userId'});



const time = db.define("Time", Time, {
  tableName: "times",
  underscored: true,
}
);

user.hasOne(time);
time.belongsTo(user, { foreignKey: 'userId' });


async function initial() {
  await role.create({
    name: "candidate"
  })

  await role.create({
    name: "admin"
  })

  await role.create({
    name: "user"
  })

  const userRole1 = await role.findOne({ where: { name: "admin" } });
  await user.create({
    name: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync('123456', 8),
    role_id: userRole1.id,

  })

  const userRole2 = await role.findOne({ where: { name: "user" } });
  await user.create({
    name: "ridha ilham",
    email: "ridha@gmail.com",
    password: bcrypt.hashSync('123456', 8),
    role_id: userRole2.id,

  })

  
  await user.create({
    name: "adi setyawan",
    email: "adi@gmail.com",
    password: bcrypt.hashSync('123456', 8),
    role_id: userRole2.id,

  })

}


db.sync()
  .then(() => {
    // initial();

    console.log("database connected");

  }).catch(() => {
    console.log("database failed");
  })

module.exports = { db, user, role, posting, profile, review, voting, time };