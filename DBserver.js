import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Cohere } from "cohere-ai";
import { Mood } from "./services/moodService.js";
import { User } from "./services/userService.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const cohere = new Cohere("ZznJe5dxHIQooLnCEXhyoK01RpiCON5f82CnqbTgs");

app.post("/analyze", async (req, res) => {
  try {
    const { text, userID } = req.body;

    const response = await cohere.classify({
      model: "large",
      inputs: [text],
      examples: Mood, //mood - массив настроений который мы будем передаём в качесте примера (массив надо создать)
    });
    const moodLabel = response.body.classifications[0].prediction;

    const moodData = new Mood({
      message: text,
      mood: moodLabel,
      date: new Date(),
    });
    const saveData = await moodData.save();

    res.json({ data: saveData });
  } catch (error) {
    console.error("Error in /analyze route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Personal_DiaryDB");
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

connectToDatabase();
