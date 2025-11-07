import mongoose from "mongoose";

/*const moodSchema = new mongoose.Schema({
  userID: String,
  history: [
    {
      mood: String,
      message: String,
      date: String,
    },
  ],
});*/
const moodSchema = new mongoose.Schema({
  mood: String,
  message: String,
  date: String,
});

const Mood = mongoose.model("Mood", moodSchema);

export default { Mood };
