const authService = require('../../services/auth.service');

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
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
        throw new Error(err.message);
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('auth');
        return res.status(200).json({
            message: 'Logout successful',
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required.' });
    }

    try {
        const newAccessToken = authService.refreshAccessToken(refreshToken);
        res.json({
            message: 'Token refreshed successfully.',
            accessToken: newAccessToken,
        });
    } catch (err) {
        console.error(err.message);
        next(err);
    }
};
``;
