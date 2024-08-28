const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user'); // Correct relative path

const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Sign-in successful', token });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ message: 'Error signing in user', error });
  }
};

module.exports = userSignIn;
