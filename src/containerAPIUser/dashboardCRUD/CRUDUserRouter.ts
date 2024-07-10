import express from 'express';
import createUserAPI from './CRUDUserAPI';
import { Application } from 'express-serve-static-core';

const router = express.Router();

const CRUDUserRoutes = (app: Application) => {
  router.post('/create-new-user', createUserAPI.handleCreateUser);
  router.delete('/delete-user', createUserAPI.handleDeleteUser);
  router.put('/edit-user', createUserAPI.handleEditUser);
	router.get('/get-all-user-by-id', createUserAPI.handleGetAllUsersById);


  return app.use('/api', router);
};

export default CRUDUserRoutes;
