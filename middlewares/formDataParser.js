const multer = require('multer');
const os = require('os');

const upload = multer({
  uploadDir: os.tmpdir(),
  autoClean: true,
});

module.exports = (req, res, next) => {
  const contentType = req.headers['content-type'] || '';
  if (contentType.includes('multipart/form-data')) {
    upload.any()(req, res, next);
  } else {
    next();
  }
};
