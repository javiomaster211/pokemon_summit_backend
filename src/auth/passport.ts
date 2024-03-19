// Imports
import passport from 'passport';
import googleStrategyConfig from './strategies/google.strategy';
import { StrategyOptions } from 'passport-google-oauth20';
import localStrategyConfig from './strategies/local.strategy';
import { IStrategyOptions } from 'passport-local';

/**
 * Implements passport strategies configuration
 * @param googleOptions StrategyOptions
 * @param localOptions IstrategyOptions
 */
const configurePassport = (
  googleOptions: StrategyOptions,
  localOptions: IStrategyOptions
): void => {
  googleStrategyConfig(passport, googleOptions);
  localStrategyConfig(passport, localOptions);
};

export default configurePassport;
