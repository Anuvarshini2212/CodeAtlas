const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/zip" ||
    file.originalname.endsWith(".zip")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Only ZIP files are allowed"),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;