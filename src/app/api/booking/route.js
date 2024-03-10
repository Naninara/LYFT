import connectDb from "@/lib/connectDb";
import BookingModel from "@/Models/BookingModel";

export async function POST(request) {
  try {
    await connectDb();
    const requestData = await request.json();
    const { userEmail, postedEmail, RideId } = requestData;
    const isAlreadyExist = await BookingModel.findOne({
      userEmail,
      postedEmail,
      RideId,
    });
    if (isAlreadyExist) {
      return new Response("Cool! Your Booking is Confirmed", { status: 400 });
    }

    if (userEmail && postedEmail && userEmail == postedEmail) {
      return new Response("U Can't Book Rides You Posted", { status: 400 });
    }

    const data = await BookingModel.create({
      userEmail,
      postedEmail,
      RideId,
    });

    return Response.json(data, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json(err, { status: 400 });
  }
}

export async function PATCH(request) {
  try {
    await connectDb();
    const url = new URL(request.url);

    const id = url.searchParams.get("id");

    const response = await BookingModel.findByIdAndUpdate(
      { _id: id },
      { status: "Approved!!" }
    );
    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
