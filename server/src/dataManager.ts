import fs from "fs";
import { teamRoster } from "./playerModel";

export function writeToJson() {
  const teamRosterString = JSON.stringify(teamRoster, null, "\t");

  fs.writeFile("./src/players.json", teamRosterString, (err: any) => {
    if (err) {
      console.log(err);
    }
  });
}

export function readFromJson() {
  let teamRosterString = fs.readFileSync("./src/players.json", "utf-8");
  const teamRosterJSON = JSON.parse(teamRosterString);

  teamRoster.splice(0, teamRoster.length);
  teamRoster.push(...teamRosterJSON);
}
