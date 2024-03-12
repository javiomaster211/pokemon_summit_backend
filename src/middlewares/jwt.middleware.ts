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
      const error: Error = new Error('invalid_token');
      return res.status(404).json({ msg: error.message, err });
    }
  }
  if (!token) {
    const error: Error = new Error('invalid_token');
    return res.status(401).json({ msg: error.message });
  }
  next();
};

const requireAdminJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user: any = req.user;
    const { role } = user;
    if (role === 'admin') {
      return next();
    }
    const error: Error = new Error('error_unauthorized');
    return res.status(405).json({ msg: error.message });
  } catch (err) {
    const error: Error = new Error('undexpected_error');
    return res.status(401).json({ msg: error.message, err });
  }
};

export { authenticateJWT, requireAdminJWT };
