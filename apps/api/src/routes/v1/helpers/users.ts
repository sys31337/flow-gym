import express from 'express';
// import { auth, isAdmin } from '../../../middlewares/auth';
import { someRequest } from '../../../controllers/users';

const router = express.Router();

router.route('/').get(someRequest);

export default router;
