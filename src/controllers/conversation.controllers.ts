import { Request, Response } from "express";
import { createConversationPayload } from "../types";
import { Conversation } from "../database/models";

export const handleCreateConversation = async (req: Request, res: Response) => {
  try {
    const { listingId, userId, ownerId } =
      req.body as createConversationPayload;

    let conv = await Conversation.findOne({
      listing: listingId,
      participants: { $all: [userId, ownerId] },
    })
      .populate("messages")
      .populate({
        path: "participants",
        select: "first_name last_name avatar email",
      });

    if (conv) {
      return res.status(200).json({
        success: true,
        conversation: conv,
        message: "Conversation already exists.",
      });
    }

    conv = await Conversation.create({
      participants: [userId, ownerId],
      listing: listingId,
    });

    return res.status(200).json({
      success: true,
      conversation: conv,
      message: "Conversation created successfully.",
    });
  } catch (error) {
    console.log(
      `Error occurred while exec handleCreateConversation : ${JSON.stringify(
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

export const handleGetConversationMessages = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.query;

    let conv = await Conversation.findOne({
      participants: { $in: userId },
    }).populate("messages");

    if (!conv) {
      return res.status(404).json({
        success: false,
        message: "No Conversation found.",
      });
    }

    return res.status(200).json({
      success: true,
      conversation: conv,
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
