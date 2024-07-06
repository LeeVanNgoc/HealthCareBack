import express from 'express';
import createUserAPI from '../dashboardCreate/createUserAPI';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const createUserRoutes = (app: Application) => {
  router.post('/create-new-user', createUserAPI.handleCreateUser);
  return app.use('/api', router);
};

export default createUserRoutes;
