import User from '../models/user/user.model';
import { Request, Response } from 'express';
import { generateConfirmToken } from '../utils/model.utils';

const register = async (req: Request, res: Response) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    const err = new Error('user_exists');
    return res.status(400).json({ msg: err.message });
  }
  try {
    const user = new User(req.body);
    user.confirm_token = generateConfirmToken();
    await user.save();
    // TODO send verification email
    res.json({
      msg: 'new_account_created',
    });
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

const confirm = async (req: Request, res: Response) => {
  const { token } = req.params;
  const confirmUser = await User.findOne({ confirm_token: token });
  if (!confirmUser) {
    const error = new Error('invalid_token');
    return res.status(403).json({ msg: error.message });
  }
  try {
    confirmUser.confirmed = true;
    confirmUser.confirm_token = '';
    await confirmUser.save();
    res.json({ msg: 'account_activation_successuful' });
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send('user_not_exists');
    }
    res.json(updatedUser);
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send('user_not_exists');
    }
    res.status(204).send();
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

export { register, confirm, getAllUsers, getUser, updateUser, deleteUser };
