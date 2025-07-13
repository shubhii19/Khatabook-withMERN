const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');
const hisaabModel = require('../models/hisaabModel.js');
const bcrypt = require('bcrypt');

module.exports.registerController = async function (req, res) {
  const { username, name, email, password } = req.body;

  try {
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists. Please login.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      username,
      name,
      email,
      password: hash,
    });

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.SECRET_KEY, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(201).json({ message: 'Registration successful', user: { id: newUser._id, username: newUser.username, email: newUser.email } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.loginController = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ error: 'No account found. Please register.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect credentials.' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(200).json({ message: 'Login successful', user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.logoutController = function (req, res) {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logout successful' });
};

module.exports.profileController = async function (req, res) {
  let byDate = Number(req.query.byDate) || -1;
  let { startDate, endDate } = req.query;

  startDate = startDate || new Date('1980-01-01');
  endDate = endDate || new Date();

  try {
    const user = await userModel.findOne({ email: req.user.email }).populate({
      path: 'hisaabs',
      match: { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } },
      options: { sort: { createdAt: byDate } },
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
