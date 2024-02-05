const { user } = require('../models');

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