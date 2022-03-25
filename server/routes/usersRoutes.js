import express from 'express';
import { signin, signup } from '../controllers/usersController.js';
const router = express.Router();

router.post('/', signup);
router.post('/', signin);

export default router;
