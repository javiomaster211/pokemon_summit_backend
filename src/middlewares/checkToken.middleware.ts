import { Request, Response, NextFunction } from 'express';
import Trainer from '../models/Trainer';

/**
 * Guard middleware to check confirmation tokens
 * @param req
 * @param res
 * @param next
 */
// TODO quizas el checktoken deberia ser un jwt con tiempo de expiracion PA QUE TENGA MAS SENTIDO
const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { confirm_token } = req.params;
  const isValidToken = await Trainer.findOne({ confirm_token });
  if (!isValidToken) {
    const error = new Error('invalid_token');
    return res.status(404).json({ msg: error.message });
  }
  next();
};

export default checkToken;
