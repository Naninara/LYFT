import axios from "axios";

export default async function GetPostings(email) {
  const response = await axios.get(
    `http://localhost:3000/api/ride/getridesbyemail?email=${email}`
  );
  if (response.status == 200) {
    return response.data;
  }
  return [];
}
