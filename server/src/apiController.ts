import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { readFromJson, writeToJson } from "./dataManager";
import { SpursPlayer, teamRoster } from "./playerModel";

export const getAllPlayers = (req: Request, res: Response) => {
  readFromJson();
  if (teamRoster.length < 1) {
    res.status(204).json();
  } else if (teamRoster) {
    res.status(200).json(teamRoster);
  } else {
    res.status(404).json();
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
  if (teamRoster.length < 1) {
    res.status(404).json();
  } else {
    res.status(200).json();
  }
};

export const deletePlayerByNumber = (req: Request, res: Response) => {
  readFromJson();
  const playerToDelete = teamRoster.find((x) => x.number === req.params.number);
  if (playerToDelete) {
    const playerToDeleteIndex = teamRoster.indexOf(playerToDelete);
    teamRoster.splice(playerToDeleteIndex, 1);
    writeToJson();
    res.status(200).json();
  } else {
    res.status(404).json();
  }
};

export const getPlayerByNumber = (req: Request, res: Response) => {
  readFromJson();
  const selectedPlayer = teamRoster.find((x) => x.number === req.params.number);
  if (selectedPlayer) {
    res.status(200).json(selectedPlayer);
  } else {
    res.status(404).json();
  }
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
