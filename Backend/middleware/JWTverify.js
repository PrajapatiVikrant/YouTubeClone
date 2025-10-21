import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
import {config} from "dotenv"
config();

const JWT_SECRET = process.env.JWT_SECRET_KEY; 

const JWTverify = async (req, res, next) => {
  console.log("middleware")
  try {
    const authHeader = req.headers.authorization;
   console.log(authHeader)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Invalid user' });

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    console.log(decoded)
   
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export default JWTverify;
