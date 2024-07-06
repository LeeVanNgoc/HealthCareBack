import { Request, Response } from 'express';
import db from '../../models/index';
import User from '../../models/user';

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

export default {handleGetAllUsersById };
