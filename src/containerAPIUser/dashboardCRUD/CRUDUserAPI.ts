import { Request, Response } from 'express';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = async (password: string) => {
  try {
    let hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    throw new Error('Hashing failed');
  }
}

const createUser = async (data: any) => {
  try {
    console.log('Received data:', data);
    const existingUser = await User.findOne({ where: { email: data.email } });

    if (existingUser) {
      throw new Error('Email already exists');
    } else {
      const hashPassword = await hashUserPassword(data.password);
      const newUser = await User.create({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return newUser;
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const handleCreateUser = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const newUser = await createUser(data);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error handling create user request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteUser = (userId : number) => {
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

const handleDeleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.query.id as string);
  try {
    await deleteUser(userId);
  } catch (error) {
    console.error('Error handling delete user request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const editUser = async (data: any) => {
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

const handleEditUser = async (req: Request, res: Response) => {
  const data = req.body  ;
  try {
    const result: any = await editUser(data);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.status(200).json({ message: result.message, user: result.user });
  } catch (error) {
    console.error('Error handling edit user request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getAllUsersById = (userId: string | number) => {
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

const handleGetAllUsersById = async (req: Request, res: Response) => {
  try {
    const userId = req.query.id as string | number;
    const data = await getAllUsersById(userId);
    res.status(200).json({ data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { 
  handleCreateUser,
  handleDeleteUser,
  handleEditUser,
  handleGetAllUsersById
 };
