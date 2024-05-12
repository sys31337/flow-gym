import {
  getAllUsers, getUserById, getCurrentUser, createUser, login, existance,
  refreshToken,
} from '@api/controllers/users';
import { auth, isAdmin } from '@api/middlewares/auth';
import { userCreateValidator, loginValidator, existanceValidator } from '@api/validations/users';
import express from 'express';

const router = express.Router();

router.route('/')
  .get(auth, isAdmin, getAllUsers)
  .post(userCreateValidator, createUser);

router.post('/login', loginValidator, login);
router.post('/existance', existanceValidator, existance);
router.get('/current', auth, getCurrentUser);
router.post('/refresh', auth, refreshToken);

router.get('/:id', getUserById);

export default router;
