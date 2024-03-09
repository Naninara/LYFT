import connectDb from "@/lib/connectDb";
import User from "@/Models/UserModel";
export async function POST(request) {
  try {
    await connectDb();

    const requestData = await request.json();

    const userDetails = await User.findOne({ email: requestData.email });

    if (!userDetails) {
      return new Response("In valid Credentials", { status: 400 });
    }

    if (userDetails.password === requestData.password) {
      const { name, email, image } = userDetails;
      return Response.json({ name, email, image }, { status: 200 });
    }

    return Response.json("In valid Credentials", { status: 400 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
}
