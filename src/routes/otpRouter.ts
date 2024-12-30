import express from "express";
import otpController from "../controllers/otpController";
import { Application } from "express-serve-static-core";

const router = express.Router();

const otpRoutes = (app: Application) => {
  router.post("/generate-new-otp", otpController.handleGenerateOtp);
  router.delete("/delete-otp", otpController.handleDeleteOtp);
  router.get("/get-otp", otpController.handleGetOtpByEmail);

  return app.use("/api", router);
};

export default otpRoutes;
