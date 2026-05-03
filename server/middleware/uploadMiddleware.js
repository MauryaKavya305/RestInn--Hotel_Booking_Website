// import multer from "multer";

// const upload = multer({storage: multer.diskStorage({})});

// export default upload;


import multer from "multer";

// FIX: Added destination so files are stored in /tmp (needed for cloudinary upload via file.path)
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, "/tmp"),
        filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
});

export default upload;