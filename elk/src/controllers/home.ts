import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
  res.send("<h1>home</h1>");
};
