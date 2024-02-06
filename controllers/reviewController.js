const { review } = require('../models');

exports.createorUpdateReview = async (req, res) => {
    const idUser = req.user.id;
    const idProduct = req.params.productId;

    const { content } = req.body;

    

    // if (point > 10) {
    //     return res.status(400).json({
    //         message: "Point tidak boleh lebih dari 10"
    //     });
    // }

    try {
        const myReview = await review.findOne({
            where: {
                productId: idProduct,
                userId: idUser
            }
        });

        if (myReview) {
            await myReview.update({
                // point: point || myReview.point,
                content: content || myReview.content
            });

            return res.status(200).json({
                message: "Review berhasil diupdate"
            });
        } else {

            if (content === null) {
                return res.status(400).json({
                    message: "Content belum diisi dan anda juga belum melakukan review produk ini"
                });
            }

            await review.create({
                productId: idProduct,
                userId: idUser,
                // point: point,
                content: content
            });

            return res.status(201).json({
                message: "Review berhasil dibuat"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Terjadi kesalahan server"
        });
    }
};
