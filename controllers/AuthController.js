const { user, profile } = require('../models');
const bcrypt = require('bcryptjs');
const { role } = require('../models');
const jwt = require('jsonwebtoken');


// fungsi proses token jwt
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

// fungsi pembuatan cookie 
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOption = {
    expire: new Date(
      process.env.JWT_COOKIE_EXPIRES
    ),
    httpOnly: true
  }

  res.cookie('jwt', token, cookieOption)

  user.password = undefined;

  res.status(statusCode).json({
    status: "Success",
    message: "berhasil membuat user",
    data: {
      user: user
    }
  })
}



// fungsi registrasi pengguna
exports.registerUser = async (req, res, next) => {



  if (req.body.name == null || req.body.email == null || req.body.password == null || req.body.passwordConfirm == null || req.body.age == null || req.body.address == null) {
    return res.status(400).json({
      message: "mohon diisi dengan lengkap",
    });
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return res.status(400).json({ message: "Password dan Confirm Password tidak cocok" });
  }

  // Email validation using regular expression for Gmail addresses
  const isGmail = /@gmail\.com$/.test(req.body.email);
  if (!isGmail) {
    return res.status(400).json({ message: "Email harus menggunakan Gmail" });
  }

  const isUserExist = await user.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (isUserExist) {
    return res.status(400).json({
      message: "email sudah digunakan",
    });
  }


  const hashPassword = await bcrypt.hash(req.body.password, 8)



  const userRole = await role.findOne({
    where: {
      name: "user"
    }
  });


  
  try {
    
    const newUser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role_id: userRole.id
    });

    createSendToken(newUser, 201, res);

    // const token = jwt.sign(newUser.id,
    //   process.env.SECRET_KEY, 
    //   {
    //       expiresIn: '1h',
    //   }
    // );
    next()
    
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      errors: error.errors 

    });
  }
};





// fungsi login pengguna
exports.loginUser = async (req, res, next) => {


  try {
    const isUserFound = await user.findOne({
      where: {
        email: req.body.email
      }
    });

    console.log(isUserFound);

    if (!isUserFound) {
      return res.status(403).json({
        message: 'User Not Found'
      });
    }

    // if(isUserFound.role != "user") {
    //   return res.status(400).json({
    //     message: "bukan user"
    //   })
    // }

    const passwordIsValid = bcrypt.compareSync(req.body.password, isUserFound.password);

    if (!passwordIsValid) {
      return res.status(400).json({
        accessToken: null,
        message: 'Invalid password'
      });
    }



    // const data = {
    //     id: isUserFound.id,
    //     name: isUserFound.name,
    //     email: isUserFound.email,

    //     role: user.role
    //   };

    // res.cookie("token", token, {
    //   httpOnly: true
    // });

    // const refreshToken = jwt.sign({ userId }, config.secret, {
    //     expiresIn: '86400'
    // });

    // await User.update({ refresh_token: refreshToken }, {
    //     where: {
    //         uuid: userId
    //     }
    // });

    // res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     maxAge: 12,
    // });

    createSendToken(isUserFound, 200, res);

    // res.status(200).json({
    //     status: "Success",
    //     token: token,
    //     message: "login berhasil"
    //  });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}



// fungsi logout pengguna
exports.logoutUser = async (req, res) => {
  res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0)
  })

  res.status(200).json({
      message: "Logout Berhasil"
  })
}

// exports.getMyUser = async (req, res) => {
//   const currentUser = await user.findByPk(req.user.id);

//   if(currentUser) {
//     return res.status(200).json({
//       id: currentUser.id,
//       name: currentUser.name,
//       email: currentUser.email,
//       role_id: currentUser.role_id
//     })

//   }
  
//   return res.status(404).json({
//     message: "User tidak ditemukan"
//   })
// }



// fungsi menampilkan data tabel user yang sudah login 
exports.getMyUser = async (req, res) => {
  const currentUser = await user.findOne({
    where: {
      id: req.user.id
    },
    include: [
      {
        model: profile,
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] }
      }
    ],
    attributes: { exclude: ["createdAt", "updatedAt", "password"] }
  });

  if(currentUser) {
    return res.status(200).json({
      data: currentUser
    })

  }
  
  return res.status(404).json({
    message: "User tidak ditemukan"
  })
}