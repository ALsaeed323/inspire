// backend/routes/authRoutes.js
import express from 'express';
import { signupform, loginform } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignup, signupform);
router.post('/signin', validateLogin, loginform);

export default router;
