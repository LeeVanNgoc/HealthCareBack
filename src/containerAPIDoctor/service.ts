import express from "express";
import CRUDDoctorRoutes from "./dashboardCRUD/CRUDDoctorRouter";
import { Application } from "express-serve-static-core";

const serviceRoutesDoctor = (app: Application) => {
  return (
	CRUDDoctorRoutes(app)
  )
};



export default serviceRoutesDoctor;
