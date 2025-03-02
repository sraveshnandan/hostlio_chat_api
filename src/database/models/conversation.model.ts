import mongoose, { Schema, Document } from "mongoose";

interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  listing: mongoose.Types.ObjectId;
  messages: mongoose.Types.ObjectId[];
}

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

export const Conversation = mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);
