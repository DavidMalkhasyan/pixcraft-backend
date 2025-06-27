import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";


const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MongoDB URI is not defined in environment variables");
  process.exit(1);
}

mongoose.connect("mongoUri")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error", err));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/photos", photoRoutes);

app.listen(PORT, () => console.log("Server running on port", PORT));
