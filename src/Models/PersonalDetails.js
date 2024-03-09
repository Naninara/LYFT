import mongoose from "mongoose";
const PersonalDetails = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
});

const PersonalDetailsShema =
  mongoose.models.PersonalDetails ||
  mongoose.model("PersonalDetails", PersonalDetails);

export default PersonalDetailsShema;
