import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { readFromJson, writeToJson } from "./middlewares";
import { SpursPlayer, teamRoster } from "./playerModel";

export const getAllPlayers = (req: Request, res: Response) => {
  readFromJson();
  if (teamRoster.length < 1) {
    res.status(204).json();
  } else {
    res.status(200).json(teamRoster);
  }
};

export const savePlayer = (req: Request, res: Response) => {
  readFromJson();
  const data: SpursPlayer = {
    id: nanoid(),
    ...req.body,
  };
  teamRoster.push(data);
  writeToJson();

  res.status(201).json(data);
};

export const deleteAllPlayers = (req: Request, res: Response) => {
  readFromJson();
  teamRoster.splice(0, teamRoster.length);
  writeToJson();
  res.status(200).json();
};

export const getPlayerByNumber = (req: Request, res: Response) => {
  readFromJson();
  res.status(200).json(teamRoster.find((x) => x.number === req.params.number));
};

export const updatePlayerInfo = (req: Request, res: Response) => {
  readFromJson();
  const selectedPlayer = teamRoster.find((x) => x.number === req.params.number);

  if (selectedPlayer) {
    const selectedPlayerIndex = teamRoster.indexOf(selectedPlayer);
    teamRoster[selectedPlayerIndex] = {
      id: nanoid(),
      ...req.body,
    };
    writeToJson();
    res.status(200).json(teamRoster[selectedPlayerIndex]);
  } else if (teamRoster.length === 0) {
    res.status(204).json();
  } else {
    res.status(404).json();
  }
};
