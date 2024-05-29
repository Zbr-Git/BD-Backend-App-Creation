import UserModel from '../../Model/User/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const AuthController = {
  signup: async (req, res) => {
    try {
      const payload = req.body;
      const { firstName, lastName, email, password } = payload;

      const chcecker = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (chcecker) res.status(409).json({ message: 'Email is taken' });

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'Signed up successfully', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Registration Error' });
    }
  },
  signin: async (req, res) => {
    try {
      const payload = req.body;
      const { email, password } = payload;

      const user = await UserModel.findOne({
        where: {
          email,
        },
      });

      if (!user) res.status(401).json({ message: 'Email is not correct' });

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword)
        res.status(401).json({ message: 'Password incorrect' });

      const data = {
        id: user.id,
        firstName: user.firstName,
        email: user.email,
      };

      // Generate JWT token
      const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });

      // Send token in response
      // res
      //   .cookie('token', token, {
      //     httpOnly: true,
      //     maxAge: 1000 * 60 * 60, // 1 hour
      //   })
      //   .json({ message: 'Login successful',token, user: { email: user.email } });

      res
        .status(201)
        .json({ message: 'Signed in successfully', user: data, token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Signin Error' });
    }
  },
};

export default AuthController;
