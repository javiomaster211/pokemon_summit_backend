import express from 'express';
import {
  createOrganization,
  deleteOrganization,
  updateOrganization,
  getOrganization,
  getAllOrganizations,
} from '../controllers/organization.controller';

const organizationRouter = express.Router();

// Rutas para los torneos
organizationRouter.post('/organization', createOrganization);
organizationRouter.get('/organization', getAllOrganizations);
organizationRouter.get('/organization/:id', getOrganization);
organizationRouter.put('/organization/:id', updateOrganization);
organizationRouter.delete('/organization/:id', deleteOrganization);

export default organizationRouter;
