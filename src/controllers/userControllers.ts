import e, { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsersById,
  loginAPI,
  getOTPRequestPasswords,
  requestPasswords,
} from "../services/userService";

const handleCreateUser = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newUser = await createUser(data);
    if (newUser.errCode === 0) {
      res.status(201).json({
        errCode: newUser.errCode,
        message: newUser.message,
        user: newUser,
      });
    } else {
      res.status(401).json({
        errCode: newUser.errCode,
        message: newUser.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: `Error to create new user ${error}`,
    });
  }
};

const handleDeleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.query.id as string);
  try {
    await deleteUser(userId);
    res.status(201).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error handling delete user request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleEditUser = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result: any = await editUser(data);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.status(200).json({ message: result.message, user: result.user });
  } catch (error) {
    console.error("Error handling edit user request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleGetAllUsersById = async (req: Request, res: Response) => {
  try {
    const userId = req.query.id as string | number;
    const data = await getAllUsersById(userId);
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleLoginUser = async (req: Request, res: Response) => {
  const userEmail = req.query.email as string;
  const userPassword = req.query.password as string;
  try {
    // Kiểm tra email và password có tồn tại không
    if (!userEmail || !userPassword) {
      return res.status(402).json({ error: "Email and password are required" });
    }

    // Gọi API đăng nhập và xử lý kết quả
    const result = await loginAPI(userEmail, userPassword);

    if (result.errCode === 0) {
      res.status(200).json({
        errCode: result.errCode,
        message: result.message,
        user: result.user,
      });
    } else {
      res.status(401).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error went login ${error}` });
  }
};
const handleRequestPasswords = async (req: Request, res: Response) => {
  const userEmail = String(req.query.userEmail);
  const otp = req.query.otp as string;
  try {
    const result = await requestPasswords(userEmail, otp);
    if (result?.errCode === 0) {
      res.status(200).json({
        token: result.token,
        data: result.data,
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(400).json({
        errCode: result?.errCode,
        message: result?.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error went request passwords ${error}` });
  }
};

const handleForgotPassword = async (req: Request, res: Response) => {
  const userEmail = String(req.query.userEmail);
  try {
    const result = await getOTPRequestPasswords(userEmail);
    if (result.errCode === 0) {
      res.status(200).json({
        otp: result.otp,
        errCode: result.errCode,
        message: result.message,
      });
    } else {
      res.status(400).json({
        errCode: result.errCode,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({ error: `Error went forgot password ${error}` });
  }
};
export default {
  handleCreateUser,
  handleDeleteUser,
  handleEditUser,
  handleGetAllUsersById,
  handleLoginUser,
  handleRequestPasswords,
  handleForgotPassword,
};
