import { Request, Response } from 'express';
import db from '../../models/index';
import User from '../../models/user';

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

export default { handleEditUser };
