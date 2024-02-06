

const { user, voting, profile } = require('../models');



exports.countVoting = async (req, res) => {
    const { nomor_candidate } = req.body

    const isCandidateExist = await user.findOne({
        where: {
            candidate: nomor_candidate
        }
    })

    if(!isCandidateExist) {
        return res.status(400).json({
            message: "candidate yang anda pilih tidak ada"
        })
    }

    const count = await voting.count({
        where: {
            candidate_selected: nomor_candidate
        }
    })

    return res.status(200).json({
        message: `jumlah suara candidate nomor ${nomor_candidate} adalah ${count}`
    })


}


exports.updateOrCreateProfile = async (req, res) => {
    const { nomor_candidate } = req.body

    const isCandidateExist = await user.findOne({
        where: {
            candidate: nomor_candidate,
            role: "candidate"
        }
    })

    if(!isCandidateExist){
        return res.status(400).json({
            message: "candidate yang anda pilih tidak ada"
        })
    }

    const idUser = req.user.id;

    
    const votingData = await voting.findOne({
        where: {
            userId: idUser
        }
    })

    
    let message = "";
    

    if(votingData) {
        await voting.update({
            candidate_selected: nomor_candidate || isCandidateExist.candidate,
            
        }, {
            where: {
                userId: idUser
            }
        })
        message = "Voting berhasil update"
    } else {
        await voting.create({
            candidate_selected: nomor_candidate || isCandidateExist.candidate,
            userId: idUser
        })

        message = "Voting berhasil dibuat"
    }

    return res.status(201).json({
        message: message
    })
}