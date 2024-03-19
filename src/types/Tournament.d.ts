import { Document, Types } from 'mongoose';

interface ITournament extends Document {
  name: string;
  organizer: ObjectId;
  description?: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  participants: Array;
  maxParticipants: number;
  prizePool: number;
  rules: Object;
  tournamentType: 'Round Robin' | 'Single Elimination' | 'Double Elimination';
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  ranking?: Array<string>;
}

export default ITournament;
