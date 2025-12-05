import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: String,
  password: String,
  userID: String,
});

export const User = mongoose.model("User", userSchema);
