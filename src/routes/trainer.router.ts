// Imports
import express from 'express';
import {
  register,
  confirm,
  getAllTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer,
  forgotPassword,
  newPassword,
} from '../controllers/trainer.controller';
import { requireAdminJWT } from '../middlewares/jwt.middleware';
import checkToken from '../middlewares/checkToken.middleware';

// Express Router instance
const trainerRouter = express.Router();

// Get
trainerRouter.get('/trainers', getAllTrainers);
trainerRouter.get('/trainers/:id', getTrainer);
trainerRouter.get('/trainers/confirmation/:confirm_token', checkToken, confirm);

// Put
trainerRouter.put('/trainers/:id', updateTrainer);

// Post
trainerRouter.post('/trainers', register);
trainerRouter.post('/trainers/forgot-password', forgotPassword);
trainerRouter.post(
  '/trainers/forgot-password/:confirm_token',
  checkToken,
  newPassword
);

// Delete
trainerRouter.delete('/trainers/:id', requireAdminJWT, deleteTrainer);

export default trainerRouter;
