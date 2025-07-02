import express from "express"
import { config } from "dotenv";
import connectDb from "./config/db.js";

config();
connectDb();
const app = express();

const port = process.env.PORT || 3000





app.listen(port , ()=>console.log(`Server listen at ${port}`));