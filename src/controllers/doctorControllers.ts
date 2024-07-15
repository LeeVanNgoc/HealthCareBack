import { Request, Response } from 'express';
import {createDoctor, deletedoctor, editDoctor, getAllDoctorsById} from '../services/doctorService'

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

  const handleDeleteDoctor = async (req: Request, res: Response) => {
	const doctorEmail = req.query.email as string;
	try {
	  await deletedoctor(doctorEmail);
	} catch (error) {
	  console.error('Error handling delete doctor request:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  }

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
  