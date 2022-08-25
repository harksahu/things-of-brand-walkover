import multer from 'multer';
import path from 'path';


const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) =>{
        console.log("IN HERE");
        cb(null,'./images')
    },
    filename: (req,file,cb)=>{
        // cb(null, Date.now() + '--' + file.originalname)
        req.imageName = new Date().toISOString().replace(/:/g, '-') + file.originalname
        cb(null, req.imageName)
    },
});

const upload = multer({storage: fileStorageEngine});

export  default upload;