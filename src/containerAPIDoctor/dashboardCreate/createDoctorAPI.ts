import { Request, Response } from 'express';
import Doctor from '../../models/doctor';
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

const createDoctor = async (data: any) => {
  try {
    console.log('Received data:', data);
    const existingDoctor = await Doctor.findOne({ where: { email: data.email } });

    if (existingDoctor) {
      throw new Error('Email already exists');
    } else {
      const hashPassword = await hashUserPassword(data.password);
      const newUser = await Doctor.create({
        email: data.email,
        name: data.name,
        address: data.address,
        password: hashPassword,
        phonenumber: data.phonenumber,
        image: data.image,
        evuluate: data.evuluate,
      });
      return newUser;
    }
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const handleCreateDoctor = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const newUser = await createDoctor(data);
    res.status(201).json({ message: 'Doctor created successfully', user: newUser });
  } catch (error) {
    console.error('Error handling create doctor request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default { handleCreateDoctor };
