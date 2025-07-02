import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = 'your_jwt_secret'; // or use process.env.JWT_SECRET

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

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

    // Optionally, add channelId here if the user can have one
    // const channel = await Channel.findOne({ owner: user._id });
    // if (channel) req.user.channelId = channel._id;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export default authMiddleware;
