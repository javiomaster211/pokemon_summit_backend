import mongoose, { Schema } from 'mongoose';
import ITournament from '../types/Tournament';

const TournamentSchema = new Schema<ITournament>(
  {
    name: { type: String, required: true },
    organizer: { type: Schema.Types.ObjectId },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    registrationDeadline: { type: Date, required: true },
    participants: [
      {
        participantId: { type: Schema.Types.ObjectId, ref: 'Trainer' },
        rank: Number,
      },
    ],
    maxParticipants: { type: Number, required: true },
    prizePool: { type: Number, required: true },
    rules: { type: String, required: true },
    tournamentType: {
      type: String,
      required: true,
      enum: ['Round Robin', 'Single Elimination', 'Double Elimination'],
    },

    status: {
      type: String,
      required: true,
      enum: ['Upcoming', 'Ongoing', 'Completed'],
    },
    ranking: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Tournament = mongoose.model<ITournament>('Tournament', TournamentSchema);

export default Tournament;
