import express from "express";
import getUserAPI from './getUserAPI';
import { Application } from "express-serve-static-core";
let router = express.Router();	

const getUserRoutes = (app: Application) => {
	router.get('/get-all-user-by-id', getUserAPI.handleGetAllUsersById);
	return app.use('/api', router);
}

export default getUserRoutes;