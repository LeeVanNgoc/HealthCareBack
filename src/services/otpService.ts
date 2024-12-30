import Otp from "../models/otp";

export const generateOTP = async (userEmail: string, otpCode: string) => {
  try {
    const newOtp = await Otp.create({
      email: userEmail,
      otpCode: otpCode,
    });
    if (newOtp) {
      return {
        errCode: 1,
        message: "OTP has been sent successfully!",
        data: newOtp,
      };
    } else {
      return {
        errCode: 0,
        message: "Failed to send OTP!",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error create OTP! with error ${error}`,
    };
  }
};

export const deleteOTP = async (userEmail: string) => {
  try {
    const deleteOtp = await Otp.findOne({
      where: { email: userEmail },
    });
    if (deleteOtp) {
      deleteOtp.destroy();

      return {
        errCode: 0,
        message: "OTP deleted successfully!",
      };
    } else {
      return {
        errCode: 1,
        message: "No OTP found for this user!",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error delete OTP! with error ${error}`,
    };
  }
};

export const getOtpByEmail = async (userEmail: string) => {
  try {
    const otpItem = await Otp.findOne({
      where: { email: userEmail },
      attributes: ["otpCode"],
      raw: true,
    });
    if (otpItem) {
      return {
        errCode: 0,
        message: "OTP found successfully!",
        data: otpItem,
      };
    } else {
      return {
        errCode: 1,
        message: "No OTP found for this user!",
      };
    }
  } catch (error) {
    return {
      errCode: 3,
      message: `Error get OTP! with error ${error}`,
    };
  }
};
