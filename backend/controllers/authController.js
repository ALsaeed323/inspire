import bcrypt from 'bcrypt';
import Signup from '../models/userModel.js'; // Adjust path as necessary
import jwt from 'jsonwebtoken';

// Controller function to handle user signup
export const signupform = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if passwords match
    if (password !== req.body.cpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new Signup({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token (optional)
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
