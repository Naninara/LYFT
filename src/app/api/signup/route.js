import connectDb from "../../../../lib/connectDb";
import User from "../../../../Models/UserModel";
export async function POST(request) {
  const data = await request.json();
  const { name, email, image, provider, type } = data;
  try {
    await connectDb();

    const isAlreadyRegistered = await User.findOne({ email: email });
    if (!isAlreadyRegistered) {
      const response = await User.create({
        name,
        email,
        image,
        provider,
        type,
        isEmailVerified: type === "oauth" ? true : false,
      });

      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }

  return Response.json("User Created", { status: 200 });
}
