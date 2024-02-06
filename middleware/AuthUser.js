const jwt = require('jsonwebtoken');
const { role } = require('../models');
const {secret} = require('../config/auth.js')


// exports.verifyUser = async (req, res, next) => {
//     const token = req.header('x-auth-token');

//     if (!token) {
//         return res.status(400).json({
//             message: 'Silakan login ke akun Anda dahulu',
//         });
//     }

//     try {
//         const decoded = jwt.verify(token, secret); // Replace with your 
//         const user = await User.findOne({
//             where: {
//                 uuid: decoded.userId,
//             },
//         });

//         if (!user) {
//             return res.status(400).json({
//                 message: 'User tidak ditemukan',
//             });
//         }

//         req.userId = user.id;
//         req.role = user.role;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             message: 'Token tidak valid',
//         });
//     }
// };

exports.adminOnly = async (req, res, next) => {
    // const token = req.headers['authorization'];
    
    // if (!token) {
    //     return res.status(400).json({
    //         message: 'Silakan login ke akun Anda dahulu',
    //     });
    // }

    try {
        // const decoded = jwt.verify(token, secret); // Replace with your actual secret key
        const Role = await role.findByPk(req.user.role_id);

        if (!Role) {
            return res.status(400).json({
                message: 'Role tidak ada yang cocok',
            });
        }

        if (Role.name !== "admin") {
            return res.status(403).json({
                message: 'Akses terlarang, Anda bukan admin',
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token tidak valid',
        });
    }
};


exports.candidateOnly = async (req, res, next) => {
    // const token = req.headers['authorization'];
    
    // if (!token) {
    //     return res.status(400).json({
    //         message: 'Silakan login ke akun Anda dahulu',
    //     });
    // }

    try {
        // const decoded = jwt.verify(token, secret); // Replace with your actual secret key
        const Role = await role.findByPk(req.user.role_id);

        if (!Role) {
            return res.status(400).json({
                message: 'Role tidak ada yang cocok',
            });
        }

        if (Role.name !== "candidate") {
            return res.status(403).json({
                message: 'Akses terlarang, Anda bukan candidate',
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token tidak valid',
        });
    }
};


