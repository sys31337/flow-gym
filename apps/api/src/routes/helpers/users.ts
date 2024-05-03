import { getAllUsers, getUserById, createUser } from '@api/controllers/users';
import express from 'express';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);

export default router;