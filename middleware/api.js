module.exports = (app) => {
  // Example API middleware
  app.use((req, res, next) => {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
    next();
  });
};
