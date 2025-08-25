import multer from 'multer';
import path from 'path';
import "dotenv/config";


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname).toLowerCase(); // Get original file extension
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
})

const maxSize = process.env.MAX_FILE_SIZE;

const upload = multer({
    storage: storage,
    limits: {fileSize: maxSize},
    fileFilter: function(req, file, cb){
        const fileType = /pdf/;
        const mimeType = fileType.test(file.mimetype);
        const extname = fileType.test(path.extname(file.originalname).toLowerCase());

        if( mimeType && extname){
            return cb(null, true);
        }

        cb(`FileUploadError: File upload only supports the following filetypes - ${fileType}`)
    }
}).single('file');


export {upload};