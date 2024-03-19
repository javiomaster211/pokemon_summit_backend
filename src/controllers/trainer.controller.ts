// Imports
import Trainer from '../models/Trainer';
import { Request, Response } from 'express';
import { generateConfirmToken } from '../helpers/model.helpers';
import sendTemplateEmail from '../helpers/email.helper';

/**
 * Creates a new Trainer in the database
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const register = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { email } = req.body;
  const trainerExists = await Trainer.findOne({ email });
  if (trainerExists) {
    const err = new Error('Trainer_exists');
    return res.status(400).json({ msg: err.message });
  }
  try {
    const trainer = new Trainer(req.body);
    trainer.confirm_token = generateConfirmToken();
    await trainer.save();
    await sendTemplateEmail(trainer.email, 'account_confirmation_email', {
      confirm_token: trainer.confirm_token,
    });
    return res.json({
      msg: 'new_account_created',
    });
  } catch (err: unknown) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Confirms an Trainer in the database
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const confirm = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { confirm_token } = req.params;
  const confirmTrainer = await Trainer.findOne({ confirm_token });
  if (!confirmTrainer) {
    const error = new Error('invalid_token');
    return res.status(403).json({ msg: error.message });
  }
  try {
    confirmTrainer.confirmed = true;
    confirmTrainer.confirm_token = '';
    await confirmTrainer.save();
    return res.json({ msg: 'account_activation_successuful' });
  } catch (err: unknown) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Retrieves all Trainers from database
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const getAllTrainers = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const Trainers = await Trainer.find({});
    return res.json(Trainers);
  } catch (err: unknown) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Retrieves an Trainer from database
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const getTrainer = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const trainer = await Trainer.findById(id);
    return res.json(trainer);
  } catch (err: unknown) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Updates Trainer info
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const updateTrainer = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;

  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTrainer) {
      return res.status(404).send('Trainer_not_exists');
    }
    res.json(updatedTrainer);
  } catch (err: unknown) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Deletes an Trainer
 * @param req
 * @param res
 * @returns Promise<Response| void>
 */
const deleteTrainer = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;

  try {
    const deletedTrainer = await Trainer.findByIdAndDelete(id);
    if (!deletedTrainer) {
      return res.status(404).send('Trainer_not_exists');
    }
    return res.status(204).send();
  } catch (err: unknown) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Sends forgot password email
 * @param req
 * @param res
 * @returns Promise<Response | void>
 */
const forgotPassword = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { email } = req.body;
  const trainer = await Trainer.findOne({ email });
  console.log(trainer);
  if (!trainer) {
    const err = new Error('Trainer_not_exists');
    return res.status(400).json({ msg: err.message });
  }
  try {
    trainer.confirm_token = generateConfirmToken();
    await trainer.save();
    sendTemplateEmail(email, 'forgot_password_email', {
      confirm_token: trainer.confirm_token,
    });
    res.json({
      msg: 'recovery_email_sent',
    });
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

/**
 * Renews Trainer password
 * @param req
 * @param res
 * @returns Promise<Response | void>
 */
const newPassword = async (req: Request, res: Response) => {
  const { confirm_token } = req.params;
  const { password } = req.body;
  const trainer = await Trainer.findOne({ confirm_token });
  if (trainer) {
    trainer.password = password;
    trainer.confirm_token = '';
    try {
      await trainer.save();
      res.json({ msg: 'password_updated' });
    } catch (err) {
      const error = new Error('unexpected_error');
      return res.status(404).json({ msg: error.message });
    }
  } else {
    const error = new Error('invalid_token');
    return res.status(404).json({ msg: error.message });
  }
};

export {
  register,
  confirm,
  getAllTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer,
  forgotPassword,
  newPassword,
};
