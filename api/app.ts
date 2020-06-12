/** @format */
import express from "express";
import { meetingsRouter } from "./routes/meetings";
const app = express();

app.use("/meetings", meetingsRouter);

export default app;
