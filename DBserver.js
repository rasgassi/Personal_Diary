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

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Personal_DiaryDB");
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}

connectToDatabase();
