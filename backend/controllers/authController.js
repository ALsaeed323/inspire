// backend/controllers/authController.js
import bcrypt from 'bcrypt';
import Signup from '../models/userModel.js';

// Controller function to handle user signup
export const signupform = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
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

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Controller function to handle user login
export const loginform = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Determine the redirect URL based on user role
    let redirectUrl = '/signup'; // default
    if (user.role === 'user') {
      redirectUrl = '/profile';
    } else if (user.role === 'admin') {
      redirectUrl = '/dashboard';
    }

    // Return user data and the redirect URL
    res.status(200).json({ user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role }, redirectUrl });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

