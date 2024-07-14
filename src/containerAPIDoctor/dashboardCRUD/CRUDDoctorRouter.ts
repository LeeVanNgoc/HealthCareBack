import express from 'express';
import createDoctorAPI  from './CRUDDoctorAPI';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const createDoctorRoutes = (app: Application) => {
  router.post('/create-new-doctor', createDoctorAPI.handleCreateDoctor);
  router.delete('/delete-doctor', createDoctorAPI.handleDeleteDoctor);
  router.put('/edit-doctor', createDoctorAPI.handleEditDoctor);
  router.get('/get-all-doctor-by-id', createDoctorAPI.handleGetAllDoctorsById);
  return app.use('/api', router);
};

export default createDoctorRoutes;
