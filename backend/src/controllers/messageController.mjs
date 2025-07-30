import { Conversation } from "../models/conversationModel.mjs";
import { getReceiverSocketId, io } from "../socket/socket.mjs";
import { Message } from "../models/messageModel.mjs";
import { createMessage } from "../utils/messageService.mjs";


export const getUserConversations = async (req, res) => {
    try {
        const userId = req.user._id;

        // Get conversations where the user is a participant
        const conversations = await Conversation.find({
            participants: userId
        }).populate({
            path: "participants",
            select: "username avatar",
        });

        // Filter out conversations with no messages
        const updatedConversations = await Promise.all(
            conversations.map(async (conversation) => {
                // Skip if there are no messages
                if (!conversation.messages || conversation.messages.length === 0) {
                    return null;
                }

                // Get the latest message
                const latestMessage = await Message.findOne({
                    _id: { $in: conversation.messages },
                })
                    .sort({ createdAt: -1 })
                    .populate("senderId", "username avatar")
                    .populate("receiverId", "username avatar");

                return {
                    _id: conversation._id,
                    participants: conversation.participants,
                    latestMessage: latestMessage || null,
                };
            })
        );

        // Filter out nulls (i.e., conversations with no messages)
        const filteredConversations = updatedConversations.filter(Boolean);

        return res.status(200).json({
            success: true,
            conversations: filteredConversations,
        });

    } catch (err) {
        console.error("Error fetching conversations:", err);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};


// for chatting
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        console.log("senderId: ", senderId);
        const receiverId = req.params.id;
        const { textMessage: message } = req.body;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // If not, create one now (only on actual message send)
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        const newMessage = await createMessage(senderId, receiverId, message);

        // implement socket io for real time data transfer
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
            io.to(receiverSocketId).emit('refreshChats');
        }

        return res.status(201).json({
            success: true,
            newMessage
        })
    } catch (error) {
        console.log(error);
    }
}

export const getMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        // console.log("senderId: ", senderId);
        // console.log("receiverId: ", receiverId);
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages').sort({ createdAt: -1 });

        // console.log("conversation: (getMessage)", conversation);
        if (!conversation) return res.status(200).json({ success: true, messages: [] });

        return res.status(200).json({ success: true, messages: conversation?.messages });

    } catch (error) {
        console.log(error);
    }
}