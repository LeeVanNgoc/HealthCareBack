import express from "express";
import getDoctorRoutes from './dashboardRead/getDoctorRouter';
import createDoctorRoutes from "./dashboardCreate/createDoctorRouter";
import deleteDoctorRoutes from "./dashboardDelete/deleteDoctorRouter";
import editDoctorRoutes from './dashboardEdit/editDoctorRouter';
import { Application } from "express-serve-static-core";

const serviceRoutesDoctor = (app: Application) => {
  return (
	getDoctorRoutes(app),
	createDoctorRoutes(app),
	deleteDoctorRoutes(app),
    editDoctorRoutes(app)
  )
};



export default serviceRoutesDoctor;
