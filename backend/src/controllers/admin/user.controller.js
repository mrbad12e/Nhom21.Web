const UserService = require('../../services/user.service');

exports.getAllUser = async (req, res, next) => {
    try {
        const result = await UserService.getAllUserService();
        return res.status(200).json({
            message: result,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await UserService.getUserByIdService(id);
        return res.status(200).json({
            message: result,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
