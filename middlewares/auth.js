const JWTGuard = require('../app/auth/JWTGuard');

module.exports = async (req, res, next) => {
    const guard = new JWTGuard(req);
    const user = await guard.user();

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
};
