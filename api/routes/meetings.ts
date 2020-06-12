/** @format */
import express, { Request, Response } from "express";
export const meetingsRouter = express.Router();

meetingsRouter.get("/", (req: Request, res: Response) => {
  res.send("helloo from test3");
});
