const { user, profile } = require('../models');
const bcrypt = require('bcryptjs');
const { role } = require('../models');
const jwt = require('jsonwebtoken');
const path = require('path')


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

  // res.status(statusCode).json({
  //   status: "Success",
  //   message: "berhasil membuat user",
  //   data: {
  //     user: user
  //   }
  // })
}



// fungsi registrasi pengguna
exports.registerUser = async (req, res) => {


  const { name, email, password, passwordConfirm, age, address } = req.body
  const image = req.file.path
  console.log(image);
  if (name == null || email == null || password == null || passwordConfirm == null || age == null || address == null) {
    return res.status(400).json({
      message: "mohon diisi dengan lengkap",
    });
  }

  if(!image) {
    return res.status(400).json({
      message: image
    })
  }

  if (req.body.password !== req.body.passwordConfirm) {
    return res.status(400).json({ message: "Password dan Confirm Password tidak cocok" });
  }


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
      roleId: userRole.id
    });

    // const idUser = newUser.id;
    // const image = req.file.path

    await profile.create({
      age: req.body.age,
      address: req.body.address,
      image: image,
      userId: newUser.id
    })

    createSendToken(newUser, 201, res);



    
    return res.status(200).json({
      message: "Akun berhasil dibuat"
    })


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



    const passwordIsValid = bcrypt.compareSync(req.body.password, isUserFound.password);

    if (!passwordIsValid) {
      return res.status(400).json({
        accessToken: null,
        message: 'Invalid password'
      });
    }


    createSendToken(isUserFound, 200, res);

    res.status(200).json({
        status: "Success",
        // token: token,
        message: "login berhasil"
     });

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

  if (currentUser) {
    return res.status(200).json({
      data: currentUser
    })

  }

  return res.status(404).json({
    message: "User tidak ditemukan"
  })
}