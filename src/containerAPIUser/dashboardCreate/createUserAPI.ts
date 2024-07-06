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

export default { handleCreateUser };
