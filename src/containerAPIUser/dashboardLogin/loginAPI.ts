import { Request, Response } from 'express';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

// Hàm kiểm tra email người dùng
const checkUserEmail = async (userEmail: string): Promise<boolean> => {
  try {
    const user = await User.findOne({
      where: { email: userEmail },
    });
    return !!user; // Trả về true nếu user tồn tại, ngược lại trả về false
  } catch (error) {
    throw error;
  }
};

// Hàm đăng nhập
const loginAPI = async (userEmail: string, userPassword: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData: any = {};
      const isExists = await checkUserEmail(userEmail);
      
      if (isExists) {
        const user = await User.findOne({
          attributes: ['email', 'password'],
          where: { email: userEmail },
          raw: true,
        });
        
        if (user) {
          // So sánh mật khẩu
          const check = await bcrypt.compareSync(userPassword, user.password);
          
          if (check) {
            // Xóa trường password để tránh bảo mật thông tin
            delete userData.password;
            userData.user = user;
            resolve({
              success: true,
              user: userData.user,
            });
          } else {
            resolve({
              success: false,
              message: 'Password is incorrect',
            });
          }
        } else {
          resolve({
            success: false,
            message: 'User not found', // Thông báo khi không tìm thấy user
          });
        }
      } else {
        resolve({
          success: false,
          message: 'Your email does not exist in the system. Please try another email',
        });
      }
    } catch (error) {
      reject(error); // Xử lý lỗi và reject promise
    }
  });
};

// Xử lý yêu cầu đăng nhập
const handleLoginUser = async (req: Request, res: Response) => {
  try {
    const userEmail = req.body.email as string;
    const userPassword = req.body.password as string;

    // Kiểm tra email và password có tồn tại không
    if (!userEmail || !userPassword) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Gọi API đăng nhập và xử lý kết quả
    const result: any = await loginAPI(userEmail, userPassword);

    if (result.success) {
      res.status(200).json({ success: true, user: result.user });
    } else {
      res.status(401).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { handleLoginUser };
