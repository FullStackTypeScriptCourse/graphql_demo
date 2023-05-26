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
    const token = jwt.sign({ userId: user._id, userName: user.username, roles: user.roles }, process.env.JWT_SECRET as string, {
      expiresIn: 60 * 60, // 60 minutes
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error: ${error}` });
  }
});

router.head('/validate-token', async (req, res) => {
    const token = req.headers.authorization || '';
    console.log('HEADERS: ', req.headers);
    res.setHeader('Cache-Control', 'no-store');
    // return res.status(401).json({ valid: false });
    if (!token) {
      return res.status(400).json({ valid: false, msg: 'Bad Request: No token provided' });
    }
    // Check if token is valid and not expired
    try {
      const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
      console.log('DECODED: ', decoded);
      return res.status(200).json({ valid: true });
    } catch (error) {
      console.error('VALIDATIONERROR: ',error);
      return res.status(401).json({ valid: false });
    }
  });

router.get('*', function(req, res){
    res.send({ status: 404, message: 'Ressource not found' });
  });

export default router;