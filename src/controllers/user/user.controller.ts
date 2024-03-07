import User from '../../models/user/user.model';
import { Request, Response } from 'express';

function register(req: Request, res: Response) {
  const user = new User(req.body);
  user
    .save()
    .then((doc) => {
      console.log('User created:', doc);
      return res.json(doc);
    })
    .catch((err) => {
      return res.json(err);
    });
}

export { register };
