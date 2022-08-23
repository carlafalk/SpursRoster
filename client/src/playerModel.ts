export interface SpursPlayer {
  id: string;
  name: string;
  number: string;
  imageURL: string;
  position: string;
  nationality: string;
}

export type SpursPlayerCreate = Omit<SpursPlayer, "id">;

export const teamRoster: SpursPlayer[] = [];
