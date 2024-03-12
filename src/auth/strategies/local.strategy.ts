import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';
import passport, { PassportStatic } from 'passport';
import User from '../../models/user/user.model';

import { jwtSignToken } from '../../utils/jwt.utils';

const localStrategyConfig = (
  passport: PassportStatic,
  options: IStrategyOptions
) => {
  const { usernameField, passwordField } = options;
  passport.use(
    new LocalStrategy(
      { usernameField, passwordField },
      async (username: string, password: string, done) => {
        try {
          let user = await User.findOne({ username });
          // Check if user exists
          if (!user) {
            const error: Error = new Error('user_not_exists');
            return done(error.message, undefined);
          }
          const isPasswordValid = await user?.checkPassword(password);
          if (!isPasswordValid) {
            const error: Error = new Error('wrong_password');
            return done(error.message, undefined);
          }
          // Check if user is confirmed
          if (!user?.confirmed) {
            const error: Error = new Error('confirm_your_account');
            return done(error.message, undefined);
          }
          // Send user + loginToken
          const loginToken = jwtSignToken(user._id.toString(), '24h');

          return done(undefined, { user, loginToken });
        } catch (err: any) {
          const error = new Error('There was an error');
          return done(error.message, undefined);
        }
      }
    )
  );
};

export default localStrategyConfig;
