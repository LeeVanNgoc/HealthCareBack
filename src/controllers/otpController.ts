import { Request, Response } from "express";
import { generateOTP, deleteOTP, getOtpByEmail } from "../services/otpService";

const handleGenerateOtp = async (req: Request, res: Response) => {
  const userEmail = req.query.userEmail as string;
  const otpCode = req.query.otpCode as string;
  try {
    const result = await generateOTP(userEmail, otpCode);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: "OTP sent successfully",
        data: result.data,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleDeleteOtp = async (req: Request, res: Response) => {
  const userEmail = req.query.userEmail as string;
  try {
    const result = await deleteOTP(userEmail);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: "OTP deleted successfully",
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetOtpByEmail = async (req: Request, res: Response) => {
  const userEmail = req.query.userEmail as string;
  try {
    const result = await getOtpByEmail(userEmail);
    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: "OTP sent successfully",
        data: result.data,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default { handleGenerateOtp, handleDeleteOtp, handleGetOtpByEmail };
