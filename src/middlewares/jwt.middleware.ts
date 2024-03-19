// Imports
const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from 'express';
import Trainer from '../models/Trainer';

/**
 * Guard middleware to prevent invalid Bearer auth token from requesting to server
 * @param req
 * @param res
 * @param next
 */
const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = (await Trainer.findById(decoded._id)) || undefined;
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

/**
 * Guard middleware check if the requesting Trainer has admin privileges
 * @param req
 * @param res
 * @param next
 * @returns
 */
const requireAdminJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    let trainer: any = req.user;
    const { role } = trainer;
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
