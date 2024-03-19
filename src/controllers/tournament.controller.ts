// Imports
import Tournament from '../models/Tournament'; // Ajusta la ruta según sea necesario
import { Request, Response } from 'express';

// Crear un torneo
const createTournament = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const newTournament = await Tournament.create(req.body);
    res.status(201).json(newTournament);
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

// Obtener todos los torneos
const getAllTournaments = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

// Obtener un torneo por ID
const getTournament = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'tournament_not_found' });
    }
    res.status(200).json(tournament);
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

// Actualizar un torneo
const updateTournament = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTournament) {
      return res.status(404).json({ message: 'tournament_not_found' });
    }
    res.status(200).json(updatedTournament);
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

// Eliminar un torneo
const deleteTournament = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const deletedTournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!deletedTournament) {
      return res.status(404).json({ message: 'tournament_not_found' });
    }
    res.status(204).send();
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};
// Agregar un participante al torneo
const addParticipant = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    tournament.participants.push(req.body); // req.body debe contener el participantId y, opcionalmente, el rank
    await tournament.save();
    res.status(200).json(tournament);
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

// Eliminar un participante del torneo
const removeParticipant = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { $pull: { participants: { participantId: req.body.participantId } } },
      { new: true }
    );
    if (!tournament) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.status(200).json(tournament);
  } catch (err) {
    const error = new Error('unexpected_error');
    return res.status(400).json({ error: err, msg: error.message });
  }
};

export {
  createTournament,
  deleteTournament,
  updateTournament,
  getTournament,
  getAllTournaments,
  addParticipant,
  removeParticipant,
};
