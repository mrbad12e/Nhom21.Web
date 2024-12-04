const UserService = require('../../services/user.service');
const CartService = require('../../services/cart.service');

// Hàm đăng nhập
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await UserService.signIn(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = UserService.createToken(user);

        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production' 
        });

        res.status(200).json({ userInfo: user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed' });
    }
};

// Hàm đăng ký tài khoản mới
const register = async (req, res) => {
    try {
        const userData = req.body;

        if (!userData.username || !userData.password || !userData.email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await UserService.createAccount(userData);
        const token = UserService.createToken(user);

        res.cookie('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production' 
        });

        res.status(201).json({
            message: 'Registration successful',
            user: {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: err.message || 'Registration failed' });
    }
};

// Hàm cập nhật thông tin người dùng
const updateUserProfile = async (req, res) => {
    try {
        const userData = req.body;

        if (!userData.email && !userData.firstName && !userData.lastName) {
            return res.status(400).json({ message: 'No update data provided' });
        }

        const updatedUser = await UserService.updateProfile(req.user.id, userData);
        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser,
        });
    } catch (err) {
        console.error('Profile update error:', err);
        res.status(400).json({ message: err.message || 'Profile update failed' });
    }
};

// Hàm cập nhật trạng thái người dùng
const updateUserStatus = async (req, res) => {
    const { userId, isActive } = req.body;

    if (!userId || typeof isActive !== 'boolean') {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    try {
        const user = await UserService.updateUserStatus(userId, isActive);

        if (isActive && !(await UserService.checkCartExistence(userId))) {
            await CartService.createCartForUser(userId);
        }

        res.status(200).json({
            message: 'User status updated successfully',
            user: {
                id: user.id,
                username: user.username,
                isActive: user.isActive,
            },
        });
    } catch (err) {
        console.error('User status update error:', err);
        res.status(500).json({
            message: 'Error updating user status',
            error: err.message,
        });
    }
};

module.exports = { login, register, updateUserProfile, updateUserStatus };
