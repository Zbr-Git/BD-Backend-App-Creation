import jwt from 'jsonwebtoken';
import userSchema from '../Model/User/schema.js'

export const isAuthenticated = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) res.status(401).json({ message: 'Token Verfication Failed!' });
  token = token.replace('Bearer ', '');
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        // Differentiate between expired and invalid tokens
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token has expired.' });
        } else {
          return res.status(401).json({ message: 'Invalid token.' });
        }
      }

      // 3. Store User Data in Request Object
      req.userId = decoded.id;
      req.firstName = decoded.firstName;
      req.email = decoded.email;

      // 4. Proceed to Next Middleware
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'Authorisation Failed!' });
  }
};

export const validateUser = (req, res, next) => {
  const userData = req.body;

  // Validate user data against userSchema
  const { error } = userSchema.validate(userData);

  // If there's an error, return a response with the error details
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

// export const verifyToken = async (req, res, next) => {
//   const token = req.cookies.token;
//   console.log('Received token:', token);

//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: 'Not Authenticated by verifyToken' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
//     if (err) {
//       console.error('Token verification error:', err);
//       return res.status(403).json({ message: 'Token is not Valid!' });
//     }
//     console.log('-------------Decoded token payload:', payload);
//     req.userId = payload.id;
//     req.firstName = payload.firstName;
//     req.email = payload.email;
//     next();
//   });
// };
