import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const filterPassport = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("file type is wrong"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: filterPassport,
});

export default upload;
