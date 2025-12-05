import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  mood: String,
  message: String,
  date: String,
});

const Mood = mongoose.model("Mood", moodSchema);
const moodExamples = {
  5: "отлично",
  4: "радость",
  3: "вдохновение",
  2: "возбуждение",
  1: "интерес",
  0: "спокойствие",
  "-1": "апатия",
  "-2": "грусть",
  "-3": "тревога",
  "-4": "ужас",
  "-5": "кошмар",
};

const maxNum = 5;
const minNum = -5;

export { Mood, moodExamples, maxNum, minNum };
