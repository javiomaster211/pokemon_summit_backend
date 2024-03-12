import express from 'express';
import {
  register,
  confirm,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { requireAdminJWT } from '../middlewares/jwt.middleware';

const userRouter = express.Router();

userRouter.post('/users', register);
userRouter.get('/users', getAllUsers);
userRouter.delete('/users/:id', requireAdminJWT, deleteUser);
userRouter.put('/users/:id', updateUser);
userRouter.get('/users/:id', getUser);
userRouter.put('/users/confirmation/:token', confirm);

export default userRouter;
