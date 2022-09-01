import multer, { diskStorage } from "multer";
import {join, dirname, extname} from "path";
import { fileURLToPath } from 'url';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(dirname(fileURLToPath(import.meta.url)), '../../public/images')) // 
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + extname(file.originalname))
  }
})

export const upload = multer({storage: storage})