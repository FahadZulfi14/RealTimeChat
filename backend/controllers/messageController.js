import { Conversation } from '../models/conversationModels.js'
import { Message } from '../models/messageModels.js';
import { getReceiverSocketId, io } from '../socket/socket.js';
import {v2 as cloudinary} from 'cloudinary';


export const sendMsg = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message, picture } = req.body;
        
        let pictureUrl; 
        if (picture){
            const result = await cloudinary.uploader.upload(picture)
                    pictureUrl = result.secure_url;
            
        }
        let gotConversation = await Conversation.findOne({
            participant: { $all: [senderId, receiverId] }
        });
        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participant: [senderId, receiverId]
            })
        };
        const newMsg = await Message.create({
            senderId,
            receiverId,
            message,
            picture : pictureUrl
        });
        if (newMsg) {
            gotConversation.Message.push(newMsg._id)
        }
        // await gotConversation.save()
        

        await Promise.all([gotConversation.save(), newMsg.save()])
        
//socket io 


const receiverSocketId = getReceiverSocketId(receiverId);

if(receiverSocketId){
    io.to(receiverSocketId).emit("newMsg", newMsg)
    
}
    
    
return res.status(201).json({success: true, status_code: 201, result: "Message send succesfully", message: newMsg })

} catch (error) {
    res.status(400).json({ status_code: 400, message: error.message });
}
};


export const getMsg = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
         const conversation = await Conversation.findOne({
            participant: {$all : [senderId, receiverId]}
         }).populate("Message");
         return res.status(200).json(conversation?.Message)
         



    } catch (error) {
        res.status(400).json({ status_code: 400, message: error.message });
    }

};