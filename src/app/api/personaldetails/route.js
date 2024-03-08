import connectDb from "../../../../lib/connectDb";
import PersonalDetailsShema from "../../../../Models/PersonalDetails";

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
    return Response.json(err, { status: 400 });
  }
}
