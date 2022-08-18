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
  const teamRosterString = JSON.stringify(teamRoster, null, "\t");

  fs.writeFile("./src/players.json", teamRosterString, (err: any) => {
    if (err) {
      console.log(err);
    }
  });
}

export function readFromJson() {
  fs.readFile("./src/players.json", "utf-8", (err, teamRosterString) => {
    if (err) {
      console.error(err);
    } else {
      let teamRosterJSON = JSON.parse(teamRosterString);
      teamRoster.push(...teamRosterJSON);
      console.log(teamRoster);
    }
  });
}
//errorhandler, notfoundhandler
