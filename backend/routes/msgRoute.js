import express from 'express';
import {getMsg, sendMsg} from '../controllers/messageController.js';
import isAuthorized from '../middleware/authMiddleWare.js';


const router = express.Router();

// http://localhost:8080//api/message/:id
router.post("/send/:id", isAuthorized, sendMsg )

router.get("/:id", isAuthorized, getMsg )











export default router;