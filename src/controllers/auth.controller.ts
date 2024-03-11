import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const googleAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })(req, res, next);
};

const googleAuthenticationCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('google', {
    session: false,
  })(req, res, next);
};

const localAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('local', {
    session: false,
  })(req, res, next);
};

export {
  googleAuthentication,
  googleAuthenticationCallback,
  localAuthentication,
};
