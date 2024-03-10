import axios from "axios";

export default async function getRideDetails(id) {
  let data;
  const response = await axios.get(
    `https://lyft-beta.vercel.app/api/ride?id=${id}`
  );
  if (response.status == 200) {
    return response.data[0];
  }
}
