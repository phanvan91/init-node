require('dotenv').config();
const fs = require('fs');

const algorithm = process.env.JWT_ALGORITHM || 'HS256';

module.exports = {
  algorithm,
  expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  ...(algorithm === 'HS256'
    ? {
      secret: process.env.JWT_SECRET || 'changeme',
    }
    : {
      privateKey: fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH, 'utf8'),
    }),
};