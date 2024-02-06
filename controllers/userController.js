const { user } = require('../models');


// menampilkan semua data tabel user
exports.getAllUser = async (req, res) => {
    try {
        const User = await user.findAll();

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

exports.destroyUser = async (req, res) => {

    try {
        const userId = req.params.id;

        const userData = await user.findByPk(userId);


        if (!userData) {
            return res.status(404).json({
                message: "Postingan tidak ditemukan"
            });
        }

        await user.destroy({
            where: {
                id: postingId,
                role: "user" || "candidate"
            }
        });

        return res.status(204).json({
            message: "Candidate atau User berhasil dihapus"
        });

    } catch (error) {

        
        return res.status(500).json({
            message: "Terjadi kesalahan saat menghapus postingan",
            error: error.message
        });
    }
};