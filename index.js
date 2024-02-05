const express = require("express")
const cors = require("cors")
const session = require("express-session")
const dotenv = require("dotenv")
const db = require("./models/index.js")
const SequelizeStore = require("connect-session-sequelize")
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const morgan = require('morgan');


const UserRoute = require('./routes/user.js');
const AuthRoute = require('./routes/AuthRoute.js');

const RoleRoute = require('./routes/role.js');
const ProductRoute = require('./routes/productRoute.js');
const ProfileRoute = require('./routes/profileRoute.js');
const ReviewRoute = require('./routes/reviewRoute.js');



const { secret } = require('./config/auth.js')

dotenv.config();

const app = express();

const port = 3000;


app.use(cookieParser())
app.use(express.json());


app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }))


app.use('/assets', express.static('assets'));
// app.use('/assets/products', express.static('./assets/products'))


// app.use(RolesRouter);
// app.use(CategoriesRouter)

// (async()=>{
//     await db.sync();
// })();

 
// function initial() {
//     User.create({
//         name: "admin brawijaya tournament",
//         email: "",
//         password: bcrypt.hashSync('', 8),
//         lomba: "admin",
//         tim: "admin",
//         role: 'admin',
//         wa: "082",
//         form_peserta: "1",
//         bukti_pembayaran: "1"

//     })
// }


app.use(express.json());


app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/role', RoleRoute);
app.use('/api/v1/user', UserRoute);
app.use('/api/v1/product', ProductRoute);
app.use('/api/v1/profile', ProfileRoute);
app.use('/api/v1/review', ReviewRoute);




// app.use(cors());

// app.use(cors(
//     {
//     credentials: true,
//     origin: 'https://brawijayatournament.com'
// }
// ));









// store.sync();

const APP_PORT = process.env.APP_PORT

app.listen(port, ()=> {
    console.log(`server berjalan di port ${port}`)
});
