import { getAllUsers, getUserById } from '@api/controllers/users';
import express from 'express';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;