import express from 'express';
import {
  googleAuthentication,
  googleAuthenticationCallback,
  localAuthentication,
} from '../controllers/auth.controller';
const authRouter = express.Router();

// Google
authRouter.get('/auth/google', googleAuthentication);
authRouter.get('/auth/google/callback', googleAuthenticationCallback);

// Local
authRouter.post('/auth/local', localAuthentication);

export default authRouter;
