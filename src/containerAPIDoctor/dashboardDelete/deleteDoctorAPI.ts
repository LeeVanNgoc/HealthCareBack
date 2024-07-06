import { Request, Response } from 'express';
import db from '../../models/index';
import Doctor from '../../models/doctor';

const deletedoctor = (doctorEmail : string) => {
  return new Promise (async (resolve, reject) => {
    try {
      const doctor = await Doctor.findOne({
      where: {email : doctorEmail}
    });
  
      if (!doctor) {
        resolve({
          errorCode: 1,
          errorMessage: "Not found doctor"
        })
      } else {
        await doctor.destroy();
  
        resolve({
          errorCode: 0,
          errorMessage: "doctor deleted successfully"
        })
      }
    } catch (error) {
      reject(error)
    }
  })
};

const handleDeleteDoctor = async (req: Request, res: Response) => {
  const doctorEmail = req.query.email as string;
  try {
    await deletedoctor(doctorEmail);
  } catch (error) {
    console.error('Error handling delete doctor request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default {handleDeleteDoctor};
