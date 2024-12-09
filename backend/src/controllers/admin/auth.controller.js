const authService = require('../../services/auth.service');

exports.login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const admin = await authService.validateAdminCredentials(username, password);

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials or not an admin.' });
        }

        const accessToken = authService.generateAccessToken(admin);
        res.cookie('auth', accessToken, {
            httpOnly: true,
        });
        return res.status(200).json({
            message: 'Login successful',
        });
    } catch (err) {
        next(new Error(err.message));
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('auth');
        return res.status(200).json({
            message: 'Logout successful',
        });
    } catch (err) {
        next(new Error(err.message));
    }
};
