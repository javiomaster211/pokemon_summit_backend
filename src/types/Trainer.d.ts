import { Schema } from 'mongoose';

interface ITrainer extends Document {
  _id: Schema.Types.ObjectId;
  img: string;
  name: string;
  username: string;
  pkmn_teams: string[];
  email: string;
  password: string;
  stats: TrainerStats;
  confirmed: boolean;
  confirm_token: string;
  role: string;
  checkPassword: (password: string) => Promise<boolean>;
}
type PokemonTeam = {
  name: string;
  data: string;
};
type TrainerStats = {
  wins: number;
  loses: number;
  winrate: number;
  elo: number;
};

export { ITrainer, TrainerStats, PokemonTeam };
