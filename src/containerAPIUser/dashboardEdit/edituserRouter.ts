import express from "express";
import editUserAPI from './editUserAPI';
import { Application } from "express-serve-static-core";
let router = express.Router();	

const editUserRoutes = (app: Application) => {
	router.put('/edit-user', editUserAPI.handleEditUser);
	return app.use('/api', router);
}

export default editUserRoutes;