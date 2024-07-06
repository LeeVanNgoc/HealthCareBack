import express from "express";
import deleteDoctorAPI from './deleteDoctorAPI';
import { Application } from "express-serve-static-core";
let router = express.Router();	

const deleteDoctorRoutes = (app: Application) => {
	router.delete('/delete-doctor', deleteDoctorAPI.handleDeleteDoctor);
	return app.use('/api', router);
}

export default deleteDoctorRoutes;