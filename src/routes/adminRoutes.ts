import { Router } from 'express';
import {
  createAdmin,
  loginAdmin,
  deleteAdmin,
  getAllAdmins,
} from '../controllers/adminController';

const router = Router();

router.post('/register', createAdmin);
router.post('/login', loginAdmin); 
router.delete('/:id', deleteAdmin); 
router.get('/', getAllAdmins); 

export default router;
