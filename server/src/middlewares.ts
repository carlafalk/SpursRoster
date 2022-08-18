import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { playerSchema, teamRoster } from "./playerModel";

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

export function writeToJson() {
  const teamRosterString = JSON.stringify(teamRoster, null, "\t");

  fs.writeFile("./src/players.json", teamRosterString, (err: any) => {
    if (err) {
      console.log(err);
    }
  });
}

// export function readFromJson() {
//   fs.readFile("./src/players.json", "utf-8", (err, teamRosterString) => {
//     if (err) {
//       console.error(err);
//     } else {
//       let teamRosterJSON = JSON.parse(teamRosterString);
//       teamRoster.splice(0, teamRoster.length);
//       teamRoster.push(...teamRosterJSON);
//     }
//   });
// }

export function readFromJson() {
  let teamRosterString = fs.readFileSync("./src/players.json", "utf-8");
  const teamRosterJSON = JSON.parse(teamRosterString);

  teamRoster.splice(0, teamRoster.length);
  teamRoster.push(...teamRosterJSON);
}

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
