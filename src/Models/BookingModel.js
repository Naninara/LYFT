import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  postedEmail: {
    type: String,
    required: true,
  },
  RideId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Awaiting Approval",
  },
});

const BookingModel =
  mongoose.models.bookings || mongoose.model("bookings", BookingSchema);

export default BookingModel;
