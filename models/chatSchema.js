import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ChatModel = mongoose.model('ChatLog', chatSchema);

export default ChatModel;