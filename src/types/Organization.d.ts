import { Document, Types } from 'mongoose';
import ITournament from './Tournament';
import { ITrainer } from './Trainer';

interface IOrganization extends Document {
  name: string;
  members: ObjectId[] | ITrainer[];
  presstige: number;
  stats: Object;
  img: string;
  description: string;
  banner: string;
}

export default IOrganization;
