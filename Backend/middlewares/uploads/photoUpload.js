const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
//storage
const multerStorage = multer.memoryStorage();

//file type checking
const multerFilter = async (req, file, cb) => {
  //check file type
  //   console()
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    //rejected files
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const photoUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});

//image resize
const profilePhotoResize = async (req, res, next) => {
  //   console.log(req.files[0]);
  //check if there is no file
  if (!req.files[0]) return next();
  req.files[0].filename = `user-${Date.now()}-${req.files[0].originalname}`;
  await sharp(req.files[0].buffer)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/profile/${req.files[0].filename}`));
  next();
};
//post image resize
const postImgResize = async (req, res, next) => {
  //   console.log(req.files[0]);
  //check if there is no file
  if (!req.file) return next();
  req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.join(`public/images/posts/${req.file.filename}`));
  next();
};
module.exports = { photoUpload, profilePhotoResize, postImgResize };
