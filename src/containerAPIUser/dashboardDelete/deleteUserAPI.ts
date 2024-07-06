import { Request, Response } from 'express';
import db from '../../models/index';
import User from '../../models/user';

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

export default {handleDeleteUser};
