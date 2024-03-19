import express from 'express';
import {
  createTournament,
  deleteTournament,
  updateTournament,
  getTournament,
  getAllTournaments,
} from '../controllers/tournament.controller'; // Ajusta la ruta según sea necesario

const tournamentRouter = express.Router();

// Rutas para los torneos
tournamentRouter.post('/', createTournament);
tournamentRouter.get('/', getAllTournaments);
tournamentRouter.get('/:id', getTournament);
tournamentRouter.put('/:id', updateTournament);
tournamentRouter.delete('/:id', deleteTournament);

export default tournamentRouter;
