const { profile } = require('../models');


exports.updateOrCreateProfile = async (req, res) => {
    const { age, address } = req.body

    const idUser = req.user.id;

    const userData = await profile.findOne({
        where: {
            userId: idUser
        }
    })

    console.log("INI USER BANGGG " + userData);
    let message = "";
    

    if(userData) {
        await profile.update({
            age: age || userData.age,
            address: address || userData.address
        }, {
            where: {
                userId: idUser
            }
        })
        message = "Profile berhasil update"
    } else {
        await profile.create({
            age: age,
            address: address,
            userId: idUser
        })

        message = "profile berhasil dibuat"
    }

    return res.status(201).json({
        message: message
    })
}