const UserService = require('../../services/user.service');

exports.getAllUser = async (res, req, next) => {
    try {
        const result = await UserService.getAllUserService();
        return res.status(100).json({
            message: result,
        });
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (res, req, next) => {
    try {
        const id = req.params.id;
        const result = await UserService.getUserByIdService(id);
        return res.status(200).json({
            message: result,
        });
    } catch (error) {
        throw error;
    }
};
