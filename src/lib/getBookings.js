import axios from "axios";

export async function getBookings(id) {
  const response = await axios.get(
    `https://lyft-beta.vercel.app/api/booking/getBookings?id=${id}`
  );
  if (response.status == 200) {
    return response.data;
  }
}
