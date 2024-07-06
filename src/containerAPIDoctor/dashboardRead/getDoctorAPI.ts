import { Request, Response } from 'express';
import db from '../../models/index';
import Doctor from '../../models/doctor';

const getAllDoctorsById = (doctorId: string | number) => {
  return new Promise(async (resolve, reject) => {
    let doctors: any[] = []; // Initialize as array

    try {
      if (doctorId === 'ALL') {
        doctors = await Doctor.findAll({
          attributes: ['email', 'name', 'phonenumber', 'address', 'evuluate'],
          raw: true
        });
      } else if (doctorId && doctorId !== 'ALL') {
        const doctor = await Doctor.findOne({
          where: {
            id: doctorId,
          },
          attributes: ['email', 'name', 'phonenumber', 'address', 'evuluate'],
          raw: true,
        });
        if (doctor) {
          doctors.push(doctor); // Push the single doctor into array
        }
      }
      resolve(doctors);
    } catch (error) {
      reject(error);
    }
  });
};

const handleGetAllDoctorsById = async (req: Request, res: Response) => {
  try {
    const doctorId = req.query.id as string | number;
    const data = await getAllDoctorsById(doctorId);

    // Ensure data is always an array, even if empty
    const dataArray = Array.isArray(data) ? data : [data];

    res.status(200).json({ data: dataArray });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { handleGetAllDoctorsById };
