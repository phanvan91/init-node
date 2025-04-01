require('dotenv').config();

module.exports = {
  default: process.env.QUEUE_CONNECTION || 'sync',

  connections: {
    redis: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || null,
    },
    database: {
      // Bạn có thể tự implement lưu job vào DB sau
    },
    sync: {},
  },
};
