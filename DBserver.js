import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Sentiment from "sentiment";
import { Mood, moodExamples, maxNum, minNum } from "./services/moodService.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Personal_DiaryDB");
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}

connectToDatabase();

app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    const sentiment = new Sentiment();
    const result = sentiment.analyze(text);
    console.log("Sentiment analysis result:", result);
    let mood = "neutral";
    let score = result.score;
    if (score > maxNum) {
      score = maxNum;
    } else if (score < minNum) {
      score = minNum;
    }
    mood = moodExamples[score];

    const moodData = new Mood({
      message: text,
      mood,
      date: new Date().toLocaleString(),
    });

    const saveData = await moodData.save();
    res.json({ data: saveData });
  } catch (error) {
    console.error("Error in /analyze route:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/history", async (req, res) => {
  try {
    const history = await Mood.find().sort({ date: -1 });
    res.json({ history });
  } catch (error) {
    console.error("Error in /history route:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
