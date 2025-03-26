import mongoose from "mongoose";

const conversationModel = new mongoose.Schema({
    participant:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    Message: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
},{timestamps:true});


export const Conversation = mongoose.model("Conversation",conversationModel)