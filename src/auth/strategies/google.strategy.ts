// Imports
import {
  Strategy as GoogleStrategy,
  Profile,
  StrategyOptions,
  VerifyCallback,
} from 'passport-google-oauth20';
import { PassportStatic } from 'passport';

import { ITrainer } from '../../types/Trainer';
const { jwtSignToken } = require('../../helpers/jwt.helpers');
const { newGoogleTrainer } = require('../../helpers/model.helpers');
const { PassportStatic } = require('passport');

/**
 * Implements OAuth2.0 google strategy (no session)
 * @param passport PassportStatic
 * @param strategy StrategyOptions
 */
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
          const email: string | undefined = profile.emails?.[0].value;
          if (!email) {
            const error: Error = new Error(
              'Email not available from google profile'
            );
            return done(error.message, undefined);
          }

          // Create new Trainer instance
          let Trainer: ITrainer = await newGoogleTrainer(profile);

          // Check if Trainer is confirmed
          if (!Trainer?.confirmed) {
            const error: Error = new Error('confirm_your_account');
            return done(error.message, undefined);
          }

          // Send Trainer + loginToken
          const loginToken: string = jwtSignToken(
            Trainer._id.toString(),
            '24h'
          );
          return done(undefined, { ...Trainer, loginToken });
        } catch (err: unknown) {
          const error: Error = new Error('unexpected_error');
          return done(error.message, undefined);
        }
      }
    )
  );
};

export default googleStrategyConfig;
