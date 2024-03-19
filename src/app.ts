// Imports
import express from 'express';
import trainerRouter from './routes/trainer.router';
import passport from 'passport';
import configurePassport from './auth/passport';
import cors from 'cors';
import path from 'path';
import helmet from '../node_modules/helmet/index.cjs';
import authRouter from './routes/auth.router';
import GOOGLE_AUTH_OPTIONS from './constants/GOOGLE_AUTH_OPTIONS';
import tournamentRouter from './routes/tournament.router';
import organizationRouter from './routes/organization.router';
import emailRouter from './routes/email.router';

// Load .dotenv file
require('dotenv').config();

// Config & Security
const app = express();
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: 'https://localhost:3000',
  })
);

// Auth strategies
configurePassport(GOOGLE_AUTH_OPTIONS, {
  usernameField: 'username',
  passwordField: 'password',
});
app.use(passport.initialize());

// Views
app.use(express.static(path.join(__dirname, 'views')));

// Routes
app.use(trainerRouter);
app.use(authRouter);
app.use(tournamentRouter);
app.use(organizationRouter);
app.use(emailRouter);

// Root
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

export default app;
