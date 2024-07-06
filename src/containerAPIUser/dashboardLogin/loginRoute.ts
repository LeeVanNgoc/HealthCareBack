import express from "express";
import loginAPI from './loginAPI';
import { Application } from "express-serve-static-core";
let router = express.Router();	

const loginUser = (app: Application) => {
	router.post('/login-user', loginAPI.handleLoginUser);
	return app.use('/api', router);
}

export default loginUser;