import { TrainerStats } from './types';
import { Schema } from 'mongoose';

interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  img: string;
  name: string;
  username: string;
  friend_code: string; // Since friend-code includes a hyphen, it needs to be quoted.
  pkmn_teams: Array<String>; // Assuming these are references to other documents.
  fav_pkmn: string;
  email: string;
  password: string; // It's a good practice not to store plain text passwords. Consider storing a hashed version.
  //tournaments: mongoose.Types.ObjectId[];
  stats: TrainerStats;
  confirmed: boolean;
  confirm_token: string;
  role: string;
  checkPassword: (password: string) => Promise<boolean>;
}

export { IUser };
