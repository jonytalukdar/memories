import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/userModel.js';

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(404).json({ message: 'user  already exist' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password does not match' });
    }

    const hashedPassord = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassord,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      'test',
      { expiresIn: '30d' }
    );

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
};

//for signin
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: 'user does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Password wrong!' });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      'test',
      { expiresIn: '30d' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' });
  }
};
