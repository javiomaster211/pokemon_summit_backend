import passport from 'passport';
import googleStrategyConfig from './strategies/google.strategy';
import { StrategyOptions } from 'passport-google-oauth20';
import localStrategyConfig from './strategies/local.strategy';
import { IStrategyOptions } from 'passport-local';

const configurePassport = (
  googleOptions: StrategyOptions,
  localOptions: IStrategyOptions
) => {
  googleStrategyConfig(passport, googleOptions);
  localStrategyConfig(passport, localOptions);
};

export default configurePassport;
