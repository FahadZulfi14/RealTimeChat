import multer from "multer";
import path from 'path';

import { v4 as uuidv4 } from "uuid";




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // cb(null, 'public/images')
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      const fileName = uuidv4() + path.extname(file.originalname);
      cb(null, fileName)
    }
  })
  
  export const upload = multer({ storage: storage })