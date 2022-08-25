import { NextFunction, Request, Response } from "express";
import { playerSchema } from "./playerModel";

export const validatePlayer = (req: Request, res: Response, next: NextFunction) => {
  const result = playerSchema.validate(req.body);
  if (!result.error) {
    next();
  } else {
    res.status(400).json(result.error.message);
  }
};

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.error(err);
//   res.status(500).json(err.message);
// };

// export const notFoundHandler = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   res.status(404).json("Resource does not exist.");
// };
