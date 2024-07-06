import express from "express";
import getUserRoutes from './dashboardRead/getUserRouter';
import createUserRoutes from "./dashboardCreate/createUserRouter";
import deleteUserRoutes from "./dashboardDelete/deleteUserRouter";
import editUserRoutes from './dashboardEdit/edituserRouter';
import loginUser from './dashboardLogin/loginRoute';
import { Application } from "express-serve-static-core";

const serviceRoutesUser = (app: Application) => {
  return (
	getUserRoutes(app),
	createUserRoutes(app),
	deleteUserRoutes(app),
    editUserRoutes(app),
	loginUser(app)
  )
};



export default serviceRoutesUser;
