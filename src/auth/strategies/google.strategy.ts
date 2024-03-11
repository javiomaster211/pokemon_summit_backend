import {
  Strategy as GoogleStrategy,
  Profile,
  StrategyOptions,
  VerifyCallback,
} from 'passport-google-oauth20';
import User from '../../models/user/user.model';
import { jwtSignToken } from '../../utils/jwt.utils';
import { newGoogleUser } from '../../utils/model.utils';
import { PassportStatic } from 'passport';
import { IUser } from '../../types/interfaces';

// Google auth strategy
const googleStrategyConfig = (
  passport: PassportStatic,
  options: StrategyOptions
): void => {
  passport.use(
    new GoogleStrategy(
      options,
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        try {
          // Avoiding duplicate fields
          const email = profile.emails?.[0].value;
          if (!email) {
            const error = new Error('Email not available from google profile');
            return done(error.message, undefined);
          }
          let user: IUser = await newGoogleUser(profile);
          // Check if user is confirmed
          if (!user?.confirmed) {
            const error: Error = new Error('confirm_your_account');
            return done(error.message, undefined);
          }
          // Send user + loginToken
          const loginToken = jwtSignToken(user._id.toString(), '24h');
          return done(undefined, { ...user, loginToken });
        } catch (err: unknown) {
          const error = new Error('There was an error');
          return done(error.message, undefined);
        }
      }
    )
  );
};

export default googleStrategyConfig;
