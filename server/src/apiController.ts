import { NextFunction, Request, Response } from "express";
import SpursPlayer from "./playerModel";

const teamRoster: SpursPlayer[] = [];

export const getAllPlayers = (req: Request, res: Response) => {
  res.status(200).json(teamRoster);
};

export const savePlayer = (req: Request, res: Response) => {
  const data = req.body;

  res.status(201).json(data);

  const playerToBeAdded: SpursPlayer = data;
  teamRoster.push(playerToBeAdded);
};
