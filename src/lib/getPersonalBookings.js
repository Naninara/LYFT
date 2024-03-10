import axios from "axios";

export default async function getBookingsByEmail(email) {
  const response = await axios.get(
    `https://lyft-beta.vercel.app/api/booking/getbookingbymail?email=${email}`
  );
  return response.data;
}
