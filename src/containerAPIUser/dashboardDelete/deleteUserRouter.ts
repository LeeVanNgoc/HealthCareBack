import express from "express";
import deleteUserAPI from './deleteUserAPI';
import { Application } from "express-serve-static-core";
let router = express.Router();	

const editUserRoutes = (app: Application) => {
	router.delete('/delete-user', deleteUserAPI.handleDeleteUser);
	return app.use('/api', router);
}

export default editUserRoutes;