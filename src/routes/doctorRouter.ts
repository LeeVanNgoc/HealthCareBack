import express from 'express';
import doctorControllers from '../controllers/doctorControllers';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const doctorRoutes = (app: Application) => {
  router.post('/create-new-doctor', doctorControllers.handleCreateDoctor);
  router.delete('/delete-doctor', doctorControllers.handleDeleteDoctor);
  router.put('/edit-doctor', doctorControllers.handleEditDoctor);
  router.get('/get-all-doctor-by-id', doctorControllers.handleGetAllDoctorsById);
  return app.use('/api', router);
};

export default doctorRoutes;
