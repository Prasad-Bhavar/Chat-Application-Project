import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true } //for every new data inserted time and date will be added automaticaly
);

const User = mongoose.model("User" , userSchema);

export default User;