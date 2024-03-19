// Imports
import express from 'express';
import {
  googleAuthentication,
  googleAuthenticationCallback,
  localAuthentication,
} from '../controllers/auth.controller';

// Express Router instance
const authRouter = express.Router();

// Google auth endpoints
authRouter.get('/auth/google', googleAuthentication);
authRouter.get('/auth/google/callback', googleAuthenticationCallback);

// Local auth endpoints
authRouter.post('/auth/local', localAuthentication);

export default authRouter;
