import express from 'express';
import { signupform } from '../controllers/authController.js';
import { validateSignup } from '../middleware/validationMiddleware.js';

const router = express.Router();





router.post('/signup', validateSignup, signupform);

export default router;
