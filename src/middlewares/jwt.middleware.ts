const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from 'express';
import User from '../models/user/user.model';

const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = (await User.findById(decoded._id)) || undefined;
      return next();
    } catch (err) {
      return res.status(404).json({ msg: 'There was an error', err });
    }
  }
  if (!token) {
    const error: Error = new Error('Invalid token');
    return res.status(401).json({ msg: error.message });
  }
  next();
};

export { authenticateJWT };
