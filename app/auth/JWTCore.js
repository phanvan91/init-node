const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

class JWTCore {
    static sign(payload) {
        const signKey = authConfig.algorithm === 'HS256' ? authConfig.secret : authConfig.privateKey;
        return jwt.sign(payload, signKey, {
            algorithm: authConfig.algorithm,
            expiresIn: authConfig.expiresIn,
        });
    }

    static verify(token) {
        try {
            const verifyKey = authConfig.algorithm === 'HS256' ? authConfig.secret : authConfig.privateKey;
            return jwt.verify(token, verifyKey, { algorithms: [authConfig.algorithm] });
        } catch (err) {
            return null;
        }
    }
}

module.exports = JWTCore;
