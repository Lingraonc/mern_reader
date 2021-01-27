import * as mongoose from "mongoose";
import User from "./user.interface";

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  avatar: {
    type: String,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
