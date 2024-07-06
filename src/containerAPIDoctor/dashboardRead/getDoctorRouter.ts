import express from "express";
import handleGetAllDoctorsById from './getDoctorAPI';
import { Application } from "express-serve-static-core";
let router = express.Router();	

const getDoctorRoutes = (app: Application) => {
	router.get('/get-all-doctor-by-id', handleGetAllDoctorsById.handleGetAllDoctorsById);
	return app.use('/api', router);
}

export default getDoctorRoutes;