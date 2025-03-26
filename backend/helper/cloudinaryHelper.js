import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv'

dotenv.config()



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


const uploadImageOnCloudinary = async (filePath, folderName)=>{
    try {
        // uploding image from server to cloudinary
        const result = await cloudinary.uploader.upload(filePath,{
            folder: folderName
        })

        // then delete image path from nodejs server
        try {
            fs.unlinkSync(filePath)
        } catch (error) {
            console.log("Failed to delete image from server ", error)
        }
        return{
        secure_url: result.secure_url,
        public_id : result.public_id,
    };
    } catch (error) {
        throw new Error(error)
    }
}

export {uploadImageOnCloudinary}