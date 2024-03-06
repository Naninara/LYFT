import connectDb from "../../../../lib/connectDb";
import RideModel from "../../../../Models/RideModel";

export async function POST(request) {
  try {
    await connectDb();

    const requestData = await request.json();
    const { start, end, date, postedEmail, rideAmount } = requestData;
    const isExist = await RideModel.findOne({
      start,
      end,
      date,
      postedEmail,
      rideAmount,
    });
    if (isExist) {
      return new Response("Cool!! Ride Posted Already", { status: 409 });
    }
    const response = await RideModel.create({
      start,
      end,
      date,
      postedEmail,
      rideAmount,
    });

    if (!response) {
      return new Response("Something Went Wrong!!", { status: 400 });
    }
    return new Response("Ride Posted We will Notify you for bookings", {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong!!", { status: 400 });
  }
}
