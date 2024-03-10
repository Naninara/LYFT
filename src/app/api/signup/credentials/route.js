import connectDb from "@/lib/connectDb";
import PersonalDetailsShema from "@/Models/PersonalDetails";
import User from "@/Models/UserModel";

export async function POST(request) {
  try {
    await connectDb();

    const jsonData = await request.json();
    const {
      email,
      password,
      name,
      newPassword,
      vehicleType,
      phonenumber,
      gender,
      vehicleNumber,
    } = jsonData;
    const IsuserExist = await User.findOne({ email: email });
    console.log(IsuserExist);
    if (IsuserExist) {
      return new Response("Looks Like Already Registered Try Signin", {
        status: 409,
      });
    }

    const UserCreation = await User.create({ name, email, password });
    if (!UserCreation) {
      return new Response("Something Wrong", { status: 500 });
    }

    const PersonalDetailsResponse = await PersonalDetailsShema.create({
      email,
      gender,
      vehicleNumber,
      vehicleType,
      phonenumber,
      name,
    });

    if (!PersonalDetailsResponse) {
      return new Response("Something Wrong", { status: 500 });
    }

    return new Response("User Created", { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json(err, { status: 400 });
  }
}
