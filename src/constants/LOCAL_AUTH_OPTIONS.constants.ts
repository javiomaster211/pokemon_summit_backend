import { ExtractJwt } from 'passport-jwt';
require('dotenv').config();

const LOCAL_AUTH_OPTIONS = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.OAUTH_LOCAL_SECRET,
  issuer: process.env.OAUTH_LOCAL_ISSUER,
  audience: process.env.OAUTH_LOCAL_AUDIENCE,
};

export default LOCAL_AUTH_OPTIONS;
