import express from "express";

import CRUDUserRoutes from "./dashboardCRUD/CRUDUserRouter";
import loginUser from './dashboardLogin/loginRoute';
import { Application } from "express-serve-static-core";

const serviceRoutesUser = (app: Application) => {
  return (
	CRUDUserRoutes(app),
	loginUser(app)
  )
};



export default serviceRoutesUser;
