import express from 'express';
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:5173", // allow frontend
      credentials: true,               // allow cookies / auth headers
    })
  );
app.use("/api/auth", authRoutes);
app.use("api/users", userRoutes);
app.use("api/chats", chatRoutes);

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log("I'm listenong on port PORT: " + PORT)
    connectDB();
})