import { Request, Response } from "express";
import { Conversation, Message } from "../database/models";

export const HandleCreateMessage = async (req: Request, res: Response) => {
  try {
    const { content, conversationId, senderId } = req.body;

    const newMessage = await Message.create({
      sender: senderId,
      conversation: conversationId,
      content,
    });

    let conversation = await Conversation.findById(conversationId);

    conversation.messages.push(newMessage._id);

    await conversation.save();

    return res.status(200).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.log(`Error occurred while creating new message ${error?.message} `);
    res.status(500).json({
      success: false,
      message: error?.message ?? "Internal server error.",
    });
  }
};
