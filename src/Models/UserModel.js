import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "credentials",
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  provider: {
    type: String,
    default: "credentials",
  },

  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
