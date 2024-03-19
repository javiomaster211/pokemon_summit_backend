// Imports
import { IStrategyOptions, Strategy as LocalStrategy } from 'passport-local';
import { PassportStatic } from 'passport';
import Trainer from '../../models/Trainer';
import { jwtSignToken } from '../../helpers/jwt.helpers';

/**
 * Implements OAuth local strategy (no session)
 * @param passport PassportStatic
 * @param options StrategyOptions
 */
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
          let trainer = await Trainer.findOne({ username });
          // Check if Trainer exists
          if (!trainer) {
            const error: Error = new Error('Trainer_not_exists');
            return done(error.message, undefined);
          }
          // Checks for password match
          const isPasswordValid: boolean = await trainer?.checkPassword(
            password
          );
          if (!isPasswordValid) {
            const error: Error = new Error('wrong_password');
            return done(error.message, undefined);
          }

          // Check if Trainer is confirmed
          if (!trainer?.confirmed) {
            const error: Error = new Error('confirm_your_account');
            return done(error.message, undefined);
          }

          // Send Trainer + loginToken
          const loginToken: string = jwtSignToken(
            trainer._id.toString(),
            '24h'
          );
          return done(undefined, { trainer, loginToken });
        } catch (err: unknown) {
          const error = new Error('There was an error');
          return done(error.message, undefined);
        }
      }
    )
  );
};

export default localStrategyConfig;
