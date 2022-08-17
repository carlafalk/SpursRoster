import { NextFunction, raw, Request, Response } from "express";
import { nanoid } from "nanoid";
import SpursPlayer from "./playerModel";

const teamRoster: SpursPlayer[] = [];

export const getAllPlayers = (req: Request, res: Response) => {
  res.status(200).json(teamRoster);
};

export const savePlayer = (req: Request, res: Response) => {
  const data: SpursPlayer = {
    id: nanoid(),
    ...req.body,
  };

  res.status(201).json(data);

  const playerToBeAdded: SpursPlayer = data;
  teamRoster.push(playerToBeAdded);
};

export const deleteAllPlayers = (req: Request, res: Response) => {
  teamRoster.splice(0, teamRoster.length);
  res.status(200).json(teamRoster);
};

export const getPlayerByNumber = (req: Request, res: Response) => {
  res
    .status(200)
    .json(teamRoster.find((x) => x.number === parseInt(req.params.number)));
};

export const updatePlayerInfo = (req: Request, res: Response) => {
  const selectedPlayer = teamRoster.find(
    (x) => x.number === parseInt(req.params.number)
  );

  if (selectedPlayer) {
    const selectedPlayerIndex = teamRoster.indexOf(selectedPlayer);
    teamRoster[selectedPlayerIndex] = req.body;
    res.status(200).json(teamRoster[selectedPlayerIndex]);
  } else if (teamRoster.length === 0) {
    res.status(204).json();
  } else {
    res.status(404).json();
  }
};
