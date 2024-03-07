import express from 'express';
import { register } from '../controllers/user/user.controller';

const userRouter = express.Router();

userRouter.post('/users', register);

export default userRouter;
