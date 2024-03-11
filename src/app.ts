// Imports
import express from 'express';
import userRouter from './routes/user.router';
import passport from 'passport';
import configurePassport from './auth/passport';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import authRouter from './routes/auth.router';
import GOOGLE_AUTH_OPTIONS from './constants/GOOGLE_AUTH_OPTIONS';
require('dotenv').config();

// TODO envio de emails de confirmacion
// TODO register endpoint

// Config & Security
const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: 'https://localhost:3000',
  })
);

// Auth
configurePassport(GOOGLE_AUTH_OPTIONS, {
  usernameField: 'username',
  passwordField: 'password',
  session: false,
});
app.use(passport.initialize());

// Views
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use(userRouter);
app.use(authRouter);

// Root
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

export default app;
