import express from 'express';
import createDoctorAPI from './createDoctorAPI';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const createDoctorRoutes = (app: Application) => {
  router.post('/create-new-doctor', createDoctorAPI.handleCreateDoctor);
  return app.use('/api', router);
};

export default createDoctorRoutes;
