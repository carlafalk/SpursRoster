import Joi from "joi";

export interface SpursPlayer {
  id: string;
  name: string;
  position: string;
  number: number;
  nationality: string;
}

export const playerSchema = Joi.object<SpursPlayer, false>({
  name: Joi.string().required().min(3).max(42),
  position: Joi.string()
    .required()
    .valid("striker", "goal keeper", "defender", "midfielder", "manager"),
  number: Joi.number().required().max(99).min(1),
  nationality: Joi.string().required().min(3).max(42),
});
