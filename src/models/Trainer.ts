// Imports
import mongoose from 'mongoose';
import { ITrainer } from '../types/Trainer';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

/**
 * Trainer DOC mongoose schema
 * @extends ITrainer
 */
const TrainerSchema = new Schema<ITrainer>(
  {
    img: { type: String, default: '' },
    name: { type: String, default: '' },
    username: { type: String, required: true },
    pkmn_teams: [
      {
        type: String,
      },
    ],
    email: { type: String, required: true, unique: true },
    password: { type: String, default: '' },
    stats: { type: Object, default: {} },
    confirmed: {
      type: Boolean,
      default: false,
    },
    confirm_token: { type: String, default: '' },
    role: { type: String, default: 'Trainer' },
  },
  {
    timestamps: true,
  }
);

TrainerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  await bcrypt.hash(this.password, salt).then((r) => (this.password = r));
});

TrainerSchema.methods.checkPassword = async function (formPassword: string) {
  return await bcrypt.compare(formPassword, this.password);
};

const Trainer = mongoose.model<ITrainer>('Trainer', TrainerSchema);
export default Trainer;
