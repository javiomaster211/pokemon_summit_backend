import { StrategyOptions } from 'passport-google-oauth20';
require('dotenv').config();
const GOOGLE_AUTH_OPTIONS: StrategyOptions = {
  callbackURL: process.env.OAUTH_GOOGLE_CALLBACK_URL,
  clientID: process.env.OAUTH_GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET || '',
};

export default GOOGLE_AUTH_OPTIONS;
