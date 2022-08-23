import Joi from "joi";

export interface SpursPlayer {
  id: string;
  name: string;
  number: string;
  imageURL: string;
  position: string;
  nationality: string;
}

export const teamRoster: SpursPlayer[] = [];

export const playerSchema = Joi.object<SpursPlayer, false>({
  name: Joi.string().required().min(3).max(42),
  imageURL: Joi.string().required(),
  number: Joi.string().required().max(99).min(1),
  position: Joi.string().required().valid("striker", "goal keeper", "defender", "midfielder", "manager"),
  nationality: Joi.string().required().min(3).max(42),
});
