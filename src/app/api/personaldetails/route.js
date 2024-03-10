import connectDb from "@/lib/connectDb";
import PersonalDetailsShema from "@/Models/PersonalDetails";

export async function GET({ url }) {
  try {
    const requestUrl = new URL(url);

    await connectDb();

    const email = requestUrl.searchParams.get("email");

    const PersonalDetails = await PersonalDetailsShema.findOne({
      email: email,
    });

    return Response.json(PersonalDetails, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json(err, { status: 400 });
  }
}

export async function POST(request) {
  try {
    await connectDb();
    const requestData = await request.json();

    const { email, gender, vehicleNumber, vehicleType, phonenumber, name } =
      requestData;
    console.log(name);
    await PersonalDetailsShema.updateOne(
      { email: email },
      { email, gender, vehicleNumber, vehicleType, phonenumber, name },
      { upsert: true }
    )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    return Response.json(requestData, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Bad Request", { status: 400 });
  }
}
