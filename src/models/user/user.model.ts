import mongoose from 'mongoose';
import { IUser } from '../../types/interfaces';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
const UserSchema = new Schema<IUser>(
  {
    img: { type: String, default: '' },
    name: { type: String, default: '' },
    username: { type: String, required: true },
    friend_code: { type: String, default: '' },
    pkmn_teams: {
      type: [{ type: String }],
      validate: {
        validator: Array.isArray,
        message: (props) => `${props.path} must be an array`,
      },
      default: [],
    },
    fav_pkmn: { type: String, default: '#1' },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: '' },
    //tournaments: [],
    stats: { type: Object, default: {} },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  await bcrypt.hash(this.password, salt).then((r) => (this.password = r));
});

UserSchema.methods.checkPassword = async function (formPassword: string) {
  return await bcrypt.compare(formPassword, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
