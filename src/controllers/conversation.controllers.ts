import { Request, Response } from "express";
import { createConversationPayload } from "../types";
import { Conversation, Message } from "../database/models";

export const handleCreateConversation = async (req: Request, res: Response) => {
  try {
    const { listingId, userId, ownerId } =
      req.body as createConversationPayload;

    let conv = await Conversation.findOne({
      listing: listingId,
      participants: { $all: [userId, ownerId] },
    })
      .populate("messages")
      .populate("participants", "first_name last_name avatar email _id");

    if (conv) {
      return res.status(200).json({
        success: true,
        conversation: conv,
        message: "Conversation already exists.",
      });
    }

    const newMessage = await Message.create({
      sender: userId,
      content: "Hey, I found your listing on Hostlio, Can we talk further.",
    });

    let allMsg = [];
    allMsg.push(newMessage._id);
    conv = await Conversation.create({
      participants: [userId, ownerId],
      listing: listingId,
      messages: allMsg,
    });

    return res.status(200).json({
      success: true,
      conversation: conv,
      message: "Conversation created successfully.",
    });
  } catch (error) {
    console.log("Error occurred while exec handleCreateConversation :", error);
    return res.status(500).json({
      success: false,
      message: `Internal server error.`,
    });
  }
};

export const handleGetConversationMessages = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.query;

    let conv = await Conversation.find({
      participants: { $in: userId },
    })
      .populate("messages", "sender content createdAt")
      .populate("participants", "first_name last_name avatar email _id")
      .sort({ createdAt: -1 });

    if (!conv) {
      return res.status(404).json({
        success: false,
        message: "No Conversation found.",
      });
    }

    return res.status(200).json({
      success: true,
      conversations: conv,
      message: "Conversation fetched successfully.",
    });
  } catch (error) {
    console.log(
      `Error occurred while exec handleGetConversationMessage : ${JSON.stringify(
        error,
        null,
        2
      )} `
    );
    return res.status(500).json({
      success: false,
      message: `Internal server error.`,
    });
  }
};
