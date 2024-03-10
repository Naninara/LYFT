import axios from "axios";

export default async function getBookingsByEmail(email) {
  const response = await axios.get(
    `http://localhost:3000/api/booking/getbookingbymail?email=${email}`
  );
  return response.data;
}
