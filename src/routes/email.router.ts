import express from 'express';
import {
  createEmail,
  deleteEmail,
  getAllEmails,
  getEmail,
  updateEmail,
} from '../controllers/email.controller';

const emailRouter = express.Router();

// Get
emailRouter.get('/emails', getAllEmails);
emailRouter.get('/emails/:id', getEmail);

// Put
emailRouter.put('/emails/:id', updateEmail);

// Post
emailRouter.post('/emails', createEmail);

// Delete
emailRouter.delete('/emails/:id', deleteEmail);

export default emailRouter;
