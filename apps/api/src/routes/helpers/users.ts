import {
  getAllUsers, getUserById, getCurrentUser, createUser, existance, providerAuthentication,
} from '@api/controllers/users';
import { auth, isAdmin } from '@api/middlewares/auth';
import { userCreateValidator, existanceValidator, providerAuthenticateValidator } from '@api/validations/users';
import express from 'express';

const router = express.Router();

router.route('/')
  .get(auth, isAdmin, getAllUsers)
  .post(userCreateValidator, createUser);

router.get('/current', auth, getCurrentUser);
router.post('/existance', existanceValidator, existance);
router.post('/provider', auth, providerAuthenticateValidator, providerAuthentication);

router.get('/:id', getUserById);

export default router;
