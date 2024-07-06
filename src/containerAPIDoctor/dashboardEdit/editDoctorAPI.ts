import { Request, Response } from 'express';
import db from '../../models/index';
import Doctor from '../../models/doctor';

const editDoctor = async (data: any) => {
  return new Promise(async (resolve, reject) => {
    const id = data.id;
    try {
      if (!id) {
        return resolve({ error: 'Missing required parameters!' });
      }

      const doctor = await Doctor.findOne({ where: { id } });

      if (!doctor) {
        return resolve({ error: 'Doctor not found!' });
      } else {
        doctor.name = data.name || doctor.name;
        doctor.evuluate = data.evuluate || doctor.evuluate;
        doctor.address = data.address || doctor.address;

        await doctor.save();
      }

      resolve({ message: 'Update the Doctor succeeds!', doctor });
    } catch (error) {
      console.error('Error updating Doctor:', error);
      reject(error);
    }
  });
};

const handleEditDoctor = async (req: Request, res: Response) => {
  const data = req.body  ;
  try {
    const result: any = await editDoctor(data);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }
    res.status(200).json({ message: result.message, Doctor: result.Doctor });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default { handleEditDoctor };
