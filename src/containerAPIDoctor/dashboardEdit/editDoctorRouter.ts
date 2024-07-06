import express from "express";
import editDoctorAPI from './editDoctorAPI';
import { Application } from "express-serve-static-core";
let router = express.Router();	

const editDoctorRoutes = (app: Application) => {
	router.put('/edit-doctor', editDoctorAPI.handleEditDoctor);
	return app.use('/api', router);
}

export default editDoctorRoutes;