import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
import {User} from '../models/allmodels';
// import bodyParser from 'body-parser';
// var jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/login', async (req, res) => {
    console.log('req.body: ', req.body);
    const {email, password} = req.body;
  try {
    const user = await User.findOne({ email: email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id, userName: user.username }, process.env.JWT_SECRET as string, {
      expiresIn: 60 * 30, // 30 minutes
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

export default router;