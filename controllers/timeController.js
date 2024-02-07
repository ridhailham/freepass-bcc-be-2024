

const { user, time, role } = require('../models');


// fungsi menghitung suara hasil voting
exports.getTimeByName = async (req, res) => {
    const { name_time } = req.body

    // const isCandidateExist = await user.findOne({
    //     where: {
    //         candidate: nomor_candidate
    //     }
    // })

    // if (!isCandidateExist) {
    //     return res.status(400).json({
    //         message: "candidate yang anda pilih tidak ada"
    //     })
    // }

    const count = await time.findOne({
        where: {
            name_time: name_time
        }
    })

    return res.status(200).json({
        message: `jumlah suara candidate nomor ${nomor_candidate} adalah ${count}`
    })


}


// fungsi tambah voting atau update voting
exports.updateOrCreateTime = async (req, res) => {
    

    const { start_time, end_time } = req.body

    // const isCandidateExist = await time.findOne({
    //     where: {
    //         name_time: name_time,
    //         start_time: start_time,
    //         end_time: end_time,
    //         role_id: req.user.role_id
    //     }
    // })

    // if (!isCandidateExist) {
    //     return res.status(400).json({
    //         message: "candidate yang anda pilih tidak ada"
    //     })
    // }

    const idUser = req.user.id;


    const timeData = await time.findOne({
        where: {
            userId: idUser
        }
    })


    let message = "";


    if (timeData) {
        await time.update({
            start_time: start_time,
            end_time: end_time,
        }, {
            where: {
                userId: idUser
            }
        })
        message = "Time berhasil update"

    } else {
        await time.create({
            
            start_time: start_time,
            end_time: end_time,
            userId: idUser
        })

        message = "Time berhasil dibuat"
    }

    return res.status(201).json({
        message: message
    })
}