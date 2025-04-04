import express from 'express';
import Joi from "joi";
import { User } from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import { uploadImageOnCloudinary } from '../helper/cloudinaryHelper.js';
import { upload } from '../middleware/multerMiddleWare.js';
import jwt from 'jsonwebtoken';
import isAuthorized from '../middleware/authMiddleWare.js';
import dotenv from 'dotenv';



dotenv.config({});


const router = express.Router();

const UserJoiSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    phone: Joi.string().optional().pattern(/^[0-9+\-() ]+$/),
    password: Joi.string().required().min(6),
    picture: Joi.string().optional()
});

router.post('/register', upload.single('picture'), async (req, res) => {
    try {
        await UserJoiSchema.validateAsync(req.body);
        const picturePath = req.file?.path;
        const picture = req.file?.fieldname;
        const { secure_url, public_id } = await uploadImageOnCloudinary(picturePath, "users");
        
        if (!secure_url) {
            return res.status(400).json({
                success: false,
                message: "Error while uploading Image",
                error: secure_url
            });
        }
        
        const password = await bcrypt.hash(req.body.password, 10);
        const NewUser = await User.create({ ...req.body, password, picture: { secure_url, public_id } });
        
        return res.status(201).json({success: true, status_code: 201, message: "User created successfully", user: NewUser });
    } catch (error) {
        res.status(400).json({success: false, status_code: 400, message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required().min(6)
        });
        
        await loginSchema.validateAsync(req.body);
        const { email, password } = req.body;

        // Find user in MongoDB
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({success: false, status_code: 404, message: "User not found." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({success: false, status_code: 401, message: "Invalid credentials." });
        }

        // Successful login
        const tokenData = { _id: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: 'true', partitioned: true, }).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture
        });
    } catch (error) {
        res.status(400).json({ success: false, status_code: 400, message: error.message });
    }
});

router.get('/logout', (req, res) => {
    try {
        res.status(200).cookie('token', " ", { maxAge: 0 }).json({
            message: "Logged out successfully."
        });
    } catch (error) {
        res.status(400).json({success: false, status_code: 400, message: error.message });
    }
});

router.get('/', isAuthorized, async (req, res) => {
    try {
        const loginUserId = req.id; 
        const otherUsers = await User.find({ _id: { $ne: loginUserId } }).select("-password");
        return res.status(200).json({success: true, status_code: 200, allUsers: otherUsers});
    } catch (error) {
        res.status(400).json({success: false, status_code: 400, message: error.message }); 
    }
});

export default router;
