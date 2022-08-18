import { error } from "console";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { playerSchema, SpursPlayer, teamRoster } from "./playerModel";

export const validatePlayer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = playerSchema.validate(req.body);
  if (!result.error) {
    next();
  } else {
    res.status(400).json(result.error.message);
  }
};

export function writeToJson(playerToBeAdded: SpursPlayer) {
  teamRoster.push(playerToBeAdded);
  const teamRosterJSON = JSON.stringify(teamRoster);

  fs.writeFile("./src/players.json", teamRosterJSON, error);
}

export function readFromJson() {}
//errorhandler, notfoundhandler
