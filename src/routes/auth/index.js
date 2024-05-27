import { Router } from 'express';
import AuthController from '../../controller/auth/index.js';

const authRoute = Router();

authRoute.post('/signup', AuthController.signup);
authRoute.post('/sigin', AuthController.signin);

export default authRoute;
  