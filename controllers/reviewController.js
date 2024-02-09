const { review, posting } = require('../models');



// fungsi memberikan komentar atau edit komentar lama
exports.createorUpdateReview = async (req, res) => {
    const idUser = req.user.id;
    const idPosting = req.params.postingId;

    const isPostingExist = await posting.findOne({
        where: {
            id: idPosting
        }
    })

    if(!isPostingExist) {
        return res.status(400).json({
            message: "postingan yang ingin anda komentari tidak ditemukan"
        })
    }

    const { comment } = req.body;

    

    // if (point > 10) {
    //     return res.status(400).json({
    //         message: "Point tidak boleh lebih dari 10"
    //     });
    // }

    try {
        const myReview = await review.findOne({
            where: {
                postingId: idPosting,
                userId: idUser
            }
        });

        if (myReview) {
            await myReview.update({
                
                content: content || myReview.content
            });

            return res.status(200).json({
                message: "Review berhasil diupdate"
            });
        } else {

            if (comment === null) {
                return res.status(400).json({
                    message: "Content belum diisi dan anda juga belum melakukan review produk ini"
                });
            }

            await review.create({
                postingId: idPosting,
                userId: idUser,
                comment: comment
            });

            return res.status(201).json({
                message: "Review berhasil dibuat"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};
