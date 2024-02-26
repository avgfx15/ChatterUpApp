import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const filename = new Date().toISOString().replace(/:/g, '_') + (file.originalname.split(" ").join(""));
        cb(null, filename)
    }
})

const upload = multer({
    storage: storage
})

export default upload;