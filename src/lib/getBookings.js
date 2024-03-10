import axios from "axios";

export async function getBookings(id) {
  const response = await axios.get(
    `http://localhost:3000/api/booking/getBookings?id=${id}`
  );
  if (response.status == 200) {
    return response.data;
  }
}
