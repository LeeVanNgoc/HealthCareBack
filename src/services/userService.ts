import User from '../models/user';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password: string) => {
  try {
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    throw new Error('Hashing failed');
  }
}

const setDecentralization = async (role: string) => {
  try {
    if (role !== 'admin') {
      role = 'user';
    }
    return role;
  } catch (error) {
    console.error('Error setting decentralization:', error);
    throw error;
  }
}

export const createUser = async (data: any) => {
  return new Promise (async (resolve, reject) => {

  try {
    console.log('Received data:', data);
    const existingUser = await User.findOne({ where: { email: data.email } });

    if (existingUser) {
      reject('Email already exists');
    } else {
      const hashPassword = await hashUserPassword(data.password);
      const role = await setDecentralization(data.role);
      const newUser = await User.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        password: hashPassword,
        role: role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return newUser;
    }
  } catch (error) {
    reject(error);
  }
})
};

export const deleteUser = (userId : number) => {
  return new Promise (async (resolve, reject) => {
    try {
      const user = await User.findOne({
      where: {id : userId}
    });
  
      if (!user) {
        resolve({
          errorCode: 1,
          errorMessage: "Not found user"
        })
      } else {
        await user.destroy();
  
        resolve({
          errorCode: 0,
          errorMessage: "User deleted successfully"
        })
      }
    } catch (error) {
      reject(error)
    }
  })
};

export const editUser = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    const id = data.id;
    try {
      if (!id) {
        return resolve({ error: 'Missing required parameters!' });
      }

      const user = await User.findOne({ where: { id } });

      if (!user) {
        return resolve({ error: 'User not found!' });
      } else {
        user.firstName = data.firstName || user.firstName;
        user.lastName = data.lastName || user.lastName;
        user.address = data.address || user.address;

        await user.save();
      }

      resolve({ message: 'Update the user succeeds!', user });
    } catch (error) {
      console.error('Error updating user:', error);
      reject(error);
    }
  });
};

export const getAllUsersById = (userId: string | number) => {
  return new Promise(async (resolve, reject) => {
    let users: any = '';
    try {
      if (userId === 'ALL') {
        users = await User.findAll({
          attributes: ['email', 'firstName', 'lastName', 'address'],
          raw: true});
      } else if (userId && userId !== 'ALL') {
        users = await User.findOne({
          where: {
            id: userId,
          },
          attributes: ['email', 'firstName', 'lastName', 'address'],
          raw: true,
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const checkUserEmail = async (userEmail: string): Promise<boolean> => {
  try {
    const user = await User.findOne({
      where: { email: userEmail },
    });
    return !!user; 
  } catch (error) {
    throw error;
  }
};

// Hàm đăng nhập
export const loginAPI = async (userEmail: string, userPassword: string) => {
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
          const check = await bcrypt.compareSync(userPassword, user.password);
          
          if (check) {
            // Xóa password để tránh bảo mật thông tin
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
            message: 'User not found', 
          });
        }
      } else {
        resolve({
          success: false,
          message: 'Your email does not exist in the system. Please try another email',
        });
      }
    } catch (error) {
      reject(error); 
    }
  });
};



