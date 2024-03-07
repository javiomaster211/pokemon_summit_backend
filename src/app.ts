import express, { Request, Response, NextFunction } from 'express';
import userRouter from './routes/user.router';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
const jwt = require('jsonwebtoken');
import User from './models/user/user.model';
import {
  Strategy as GoogleStrategy,
  StrategyOptions,
} from 'passport-google-oauth20';
require('dotenv').config();
const app = express();
app.use(helmet());

const AUTH_OPTIONS: StrategyOptions = {
  callbackURL: '/auth/google/callback',
  clientID: process.env.OAUTH_CLIENT_ID || '',
  clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
};

/**
 * TODO estrategia de creacion de usuarios y login sin google, normal
 * TODO organizar las estrategias de auth y middlewares en directorios manteca
 */

const authenticateJWT = async (req: any, res: any, next: any) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      console.log(req.headers);
      token = req.headers.authorization.split(' ')[1];
      console.log(req.headers);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded._id);
      return next();
    } catch (err) {
      return res.status(404).json({ msg: 'There was an error', err });
    }
  }
  if (!token) {
    const error = new Error('Invalid token');
    return res.status(401).json({ msg: error.message });
  }
  next();
};

passport.use(
  new GoogleStrategy(AUTH_OPTIONS, async function (
    accesToken,
    refreshToken,
    profile,
    done
  ) {
    const email = profile._json.email;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          img: 'http://example.com/user-avatar.jpg',
          name: 'Ash Ketchum',
          username: 'pkmnPayo',
          friend_code: 'ABCD-1234-EFGH',
          pkmn_teams: ['asdasd'],
          fav_pkmn: 'Pikachu',
          email: email,
          password: 'securePassword123', // Remember, in real applications store a hashed password.
          stats: {
            wins: 150,
            loses: 50,
            winrate: 0.75,
            elo: 1200,
          },
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Token expires in 24 hours
      );
      console.log({ user, token });
      done(null, { user, token });
    } catch (err: any) {
      done(err, undefined);
    }
  })
);

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'views')));

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());

app.use(userRouter);

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email'],
  })
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: false,
  })
);

app.get('/auth/logout', (req, res) => {});

app.get('/failure', (req, res) => {
  return res.send('Failed to log in');
});

app.get('/sicreto', authenticateJWT, (req, res) => {
  res.send('uwu te has logeado papasote🥵🥵🥵🥵👍👍😎👍😎😎👍😎👍😎');
});

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

export default app;
