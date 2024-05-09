import {
  getAllUsers, getUserById, getCurrentUser, createUser, login,
} from '@api/controllers/users';
import { auth, isAdmin } from '@api/middlewares/auth';
import { userCreateValidator, loginValidator } from '@api/validations/users';
import express from 'express';

const router = express.Router();

router.route('/')
  .get(auth, isAdmin, getAllUsers)
  .post(userCreateValidator, createUser);

router.post('/login', loginValidator, login);
router.get('/current', auth, getCurrentUser);

router.get('/:id', getUserById);

export default router;
