// Imports
import { Profile } from 'passport-google-oauth20';
import { ITrainer } from '../types/Trainer';
import Trainer from '../models/Trainer';

const newGoogleTrainer = async (TrainerInfo: Profile): Promise<ITrainer> => {
  const email: string | undefined = TrainerInfo.emails?.[0].value;
  const name: string | undefined = TrainerInfo.displayName;
  const img: string | undefined = TrainerInfo.photos?.[0].value;
  let trainer = await Trainer.findOne({ email }).exec();
  if (!trainer) {
    trainer = new Trainer({
      email,
      name,
      Trainername:
        (TrainerInfo._json.given_name ?? '') +
        (TrainerInfo._json.family_name ?? ''),
      img,
      confirmed: false,
    });
    await trainer.save();
  }

  return trainer;
};

/**
 * Generates a token for Trainer account confirmation
 * @returns string
 */
const generateConfirmToken = (): string => {
  let a: string = Math.random().toString(32).substring(2);
  let b: string = Date.now().toString(32);
  return a + b;
};

export { newGoogleTrainer, generateConfirmToken };
