import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String },
    seen: { type: Boolean, default: false },
    image:{type:String}
  },
  { timestamps: true } //for every new data inserted time and date will be added automaticaly
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
