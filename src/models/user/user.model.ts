import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

type TrainerStats = {
  wins: Number;
  loses: Number;
  elo: Number;
};

interface IUser extends Document {
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
  creation_date: Date;
  last_connection: Date;
}

const UserSchema = new Schema<IUser>(
  {
    img: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    friend_code: { type: String, required: true },
    pkmn_teams: {
      type: [{ type: String, ref: 'pokemon_team' }],
      validate: {
        validator: Array.isArray,
        message: (props) => `${props.path} must be an array`,
      },
    },
    fav_pkmn: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //tournaments: [],
    stats: { type: Object },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
