import { NextFunction, Request, Response } from "express";
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
