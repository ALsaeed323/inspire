// backend/routes/authRoutes.js
import express from 'express';
import { signupform, loginform,getHR,getAdmiV } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/hr', getHR);
router.get('/administrative',getAdmiV );
router.post('/signup', validateSignup, signupform);
router.post('/signin', validateLogin, loginform);
// router.post('/logout', logout);

export default router;
