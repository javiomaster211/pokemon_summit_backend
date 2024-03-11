import { Profile } from 'passport-google-oauth20';
import { IUser } from '../types/interfaces';
import User from '../models/user/user.model';
const newGoogleUser = async (userInfo: Profile): Promise<IUser> => {
  const email = userInfo.emails?.[0].value;
  const name = userInfo.displayName;
  const img = userInfo.photos?.[0].value;
  let user = await User.findOne({ email }).exec();
  if (!user) {
    user = new User({
      email,
      name,
      username:
        (userInfo._json.given_name ?? '') + (userInfo._json.family_name ?? ''),
      img,
      confirmed: false,
    });
    await user.save();
  }

  return user;
};

export { newGoogleUser };
