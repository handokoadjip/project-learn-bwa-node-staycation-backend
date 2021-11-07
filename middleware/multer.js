const multer = require("multer");
const path = require("path");

const storage = (dir) =>
  multer.diskStorage({
    destination: `public/images/${dir}`,
    filename: function (req, file, cb) {
      cb(
        null,
        `${new Date().getTime()}-${file.originalname
          .replace(/\s+/g, "-")
          .toLowerCase()}`
      );
    },
  });

const uploadSingle = (dir) =>
  multer({
    storage: storage(dir),
    // limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single("image");

const uploadMultiple = (dir) =>
  multer({
    storage: storage(dir),
    // limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).array("image");

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}

module.exports = { uploadSingle, uploadMultiple };
