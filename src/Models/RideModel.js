import mongoose from "mongoose";

const RideSchema = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  postedEmail: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  rideAmount: {
    type: Number,
    required: true,
  },
});

const RideModel = mongoose.models.rides || mongoose.model("rides", RideSchema);

export default RideModel;
