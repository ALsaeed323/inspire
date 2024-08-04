import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SignupSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, match: [/\S+@\S+\.\S+/, "is invalid"] },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, required: true, default: 'user' } // Default value set to 'user' 
}, {
  timestamps: true 
});

// Create a model based on that schema
const userModel = mongoose.model("Users", SignupSchema);

// Export the model
export default userModel;
