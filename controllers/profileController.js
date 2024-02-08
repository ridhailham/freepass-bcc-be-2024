const { profile } = require('../models');



// membuat dan edit tabel profile
exports.updateOrCreateProfile = async (req, res) => {
    const { age, address } = req.body

    const idUser = req.user.id;
    const image = req.file.path

    const userData = await profile.findOne({
        where: {
            userId: idUser
        }
    })

    
    let message = "";
    

    if(userData) {
        await profile.update({
            age: age || userData.age,
            address: address || userData.address,
            image: image || userData.image
        }, {
            where: {
                userId: idUser
            }
        })

        return res.status(200).json({
            message : "Profile berhasil update"
        })
        
    } else {
        await profile.create({
            age: age,
            address: address,
            userId: idUser
        })
        return res.status(200).json({
            message : "Profile berhasil dibuat"
        })
        
    }

    
}