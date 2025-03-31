const JWTCore = require('./JWTCore');

class JWTGuard {
    constructor(req) {
        this.req = req;
        this.userData = null;
    }

    parseToken() {
        const authHeader = this.req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        return authHeader.split(' ')[1];
    }

    async user() {
        if (this.userData) return this.userData;

        const token = this.parseToken();
        if (!token) return null;

        const decoded = JWTCore.verify(token);
        if (!decoded) return null;

        this.userData = decoded;
        return this.userData;
    }

    async check() {
        const user = await this.user();
        return !!user;
    }
}

module.exports = JWTGuard;
