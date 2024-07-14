import { Request, Response } from 'express';
import Doctor from '../../models/doctor';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = async (password: string) => {
  return new Promise (async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hash(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error)
    }
    })
}

const createDoctor = async (data: any) => {
  return new Promise (async (resolve, reject) => {
    try {
      console.log('Received data:', data);
      const existingDoctor = await Doctor.findOne({ where: { email: data.email } });

      if (existingDoctor) {
        resolve('Email already exists');
      } else {
        const hashPassword = await hashUserPassword(data.password);
        const newDoctor = await Doctor.create({
          email: data.email,
          name: data.name,
          address: data.address,
          password: hashPassword,
          phonenumber: data.phonenumber,
          image: data.image,
          evuluate: data.evuluate,
        });
        resolve(newDoctor);
      }
    } catch (error) {
      reject(error);
    }
  })
};

const handleCreateDoctor = async (req: Request, res: Response) => {
  const data = req.body;
    try {
      const newDoctor = await createDoctor(data);
      res.status(201).json({ message: 'Doctor created successfully', user: newDoctor });
    } catch (error) {
      console.error('Error handling create doctor request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

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

const getAllDoctorsById = (doctorId: string | number) => {
  return new Promise(async (resolve, reject) => {
    let doctors: any[] = []; // Initialize as array

    try {
      if (doctorId === 'ALL') {
        doctors = await Doctor.findAll({
          attributes: ['email', 'name', 'phonenumber', 'image', 'evuluate'],
          raw: true
        });
      } else if (doctorId && doctorId !== 'ALL') {
        const doctor = await Doctor.findOne({
          where: {
            id: doctorId,
          },
          attributes: ['email', 'name', 'phonenumber', 'image', 'evuluate'],
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

export default { 
  handleCreateDoctor, 
  handleDeleteDoctor, 
  handleEditDoctor, 
  handleGetAllDoctorsById 
};
