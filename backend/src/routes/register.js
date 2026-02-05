import bcrypt from 'bcrypt';
import express from 'express';
import Users from '../models/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');
    user = new Users({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();
    const token = user.generateAuthToken();
    const { _id, username, email } = user;
    res.header('x-auth-token', token).send({ _id, username, email });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
