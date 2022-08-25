import multer from 'multer';
import path from 'path';


const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'./uploads')
    },
    filename: (req,file,cb)=>{
        req.imageName = new Date().toISOString().replace(/:/g, '-') + path.basename(file.originalname)
        cb(null, req.imageName)
    },
});

const upload = multer({storage: fileStorageEngine}).single("image");

export  default upload;