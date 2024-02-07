const { user, time, role } = require('../models');

exports.checkDeadline = async (req, res) => {
    try {
        const startTime = new Date('2024-02-07T08:00:00'); // Ganti dengan waktu mulai yang Anda inginkan
        const endTime = new Date('2024-02-07T17:00:00'); // Ganti dengan waktu akhir yang Anda inginkan

        const { name_time } = req.body;

        const deadline = await time.findAll();

        if (!deadline) {
            return res.status(400).json({
                message: "nama deadline tidak ada"
            });
        }

        const currentTime = new Date(); // Menambahkan waktu saat ini

        if (currentTime < deadline.start_time || currentTime > deadline.end_time) {
            return res.status(403).json({ 
                message: 'Operasi tidak diizinkan di luar jam kerja.' 
            });
        }

        // Memperbaiki pesan respon agar sesuai dengan konteks
        // return res.status(200).json({
        //     message: `Operasi diizinkan pada waktu ini.`
        // });

        next();

    } catch (error) {
        // Menangani kesalahan dengan mengirimkan respon status 500 (internal server error)
        return res.status(500).json({
            message: "Terjadi kesalahan dalam mengecek deadline."
        });
    }

    
    
};
