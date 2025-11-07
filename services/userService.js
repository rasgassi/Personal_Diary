import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  user: String,
  password: String,
  userID: String,
});
const User = mongoose.model("User", userSchema);
export { User };
