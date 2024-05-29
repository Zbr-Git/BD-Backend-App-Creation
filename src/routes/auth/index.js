import { Router } from 'express';
import AuthController from '../../controller/auth/index.js';
import {
  isAuthenticated,
  validateUser,
} from '../../middleware/index.js';

const authRoute = Router();

authRoute.post('/auth/signup', validateUser, AuthController.signup);
authRoute.post('/auth/signin', isAuthenticated, AuthController.signin);

export default authRoute;
