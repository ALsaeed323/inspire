// backend/controllers/authController.js
import bcrypt from 'bcrypt';
import Signup from '../models/userModel.js';
import Session from '../models/sesstionModel.js'; 
import generateSessionId from '../utils/gsesstion.js'; 


const MAX_SESSIONS = 2;

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

    // Check the number of active sessions for the user
    const activeSessions = await Session.countDocuments({ userId: user._id });

    console.log("this is the active ->>>>>>>>"+activeSessions);
    if (activeSessions.status==="active") {
      return res.status(400).json({ message: 'Maximum session limit reached' });
    }

    // Generate a session ID
    const sessionId = generateSessionId();

    // Create a new session in the database
    const session = new Session({
      userId: user._id,
      sessionId,
      createdAt: new Date(),
    });

    await session.save();
    console.log(sessionId);

    // Return user data, session ID, and the redirect URL
    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        sessionId:sessionId,
      },
       // Include the session ID in the response
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const logout = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: 'Session ID is required' });
    }

    // Remove the session from the database
    const result = await Session.deleteOne({ sessionId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const getHR = async (req, res) => {
  try {
    // Fetch HR users from the database
    const HRusers = await Signup.find({ role: 'hr' });
    
    if (HRusers.length === 0) {
      return res.status(404).json({ message: 'No HR users found' });
    }
    
    // Send the HR users as the response
    res.status(200).json(HRusers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching HR users', error });
  }
};
export const getAdmiV = async (req, res) => {
  try {
    // Fetch HR users from the database
    const AdminVusers = await Signup.find({ role: 'administrative' });
    
    if (AdminVusers.length === 0) {
      return res.status(404).json({ message: 'No HR users found' });
    }
    
    // Send the HR users as the response
    res.status(200).json(AdminVusers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching HR users', error });
  }
};

