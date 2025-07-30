// src/services/messageService.mjs

import { Message } from "../models/messageModel.mjs";
import { Conversation } from "../models/conversationModel.mjs";

export const createMessage = async (senderId, receiverId, message) => {
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId],
        });
    }

    const newMessage = await Message.create({ senderId, receiverId, message });

    conversation.messages.push(newMessage._id);
    await Promise.all([conversation.save(), newMessage.save()]);

    return newMessage;
};
