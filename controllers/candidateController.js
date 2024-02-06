const { user, profile } = require('../models');
const bcrypt = require('bcryptjs');
const { role } = require('../models');




// admin mengubah status pengguna biasa menjadi status candidate
exports.createCandidate = async (req, res) => {

    const roleName = "candidate"

    const { candidate, paslon } = req.body



    if (req.body.name == null || req.body.email == null || req.body.candidate == null || paslon == null) {
        return res.status(400).json({
            message: "mohon diisi dengan lengkap",
        });
    }

    const isUserExist = await user.findOne({
        where: {
            email: req.body.email,
        },
    });



    if (!isUserExist) {
        return res.status(400).json({
            message: "user tidak ditemukan, tidak bisa menjadi candidate",
        });
    }



    const userRole = await role.findOne({
        where: {
            name: "candidate"
        }
    });


    try {
        await user.update({

            role_id: userRole.id,
            candidate: candidate,
            paslon: paslon

        },
            {
                where: {
                    email: req.body.email
                }
            }
        );

        return res.status(200).json({ message: "Kandidat berhasil dibuat." });

        //   createSendToken(newUser, 201, res);

        // const token = jwt.sign(newUser.id,
        //   process.env.SECRET_KEY, 
        //   {
        //       expiresIn: '1h',
        //   }
        // );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// menampilkan semua data candidate
exports.getAllCandidate = async (req, res) => {
    try {
        const User = await user.findAll({
            where: {
                role: "candidate"
            }
        });

        return res.status(200).json({
            status: "Success",
            data: User
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Fail',
            error: 'Server Down'
        })
    }

}