import connectDb from "@/lib/connectDb";
import sendApproveEmail from "@/lib/sendApproveEmail";
import SendBookingEmail from "@/lib/sendBookingEmail";
import BookingModel from "@/Models/BookingModel";
import PersonalDetailsShema from "@/Models/PersonalDetails";
import RideModel from "@/Models/RideModel";

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
    const RideDetails = await RideModel.findById(RideId);
    await SendBookingEmail(postedEmail, RideDetails.start, RideDetails.end);

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

    const isAlreadyApproved = await BookingModel.findById(id);

    if (isAlreadyApproved.status == "Approved!!") {
      return new Response("Ride Already Approved", { status: 409 });
    }

    const response = await BookingModel.findByIdAndUpdate(
      { _id: id },
      { status: "Approved!!" }
    );

    const RideData = await RideModel.findById(response.RideId);

    const OwnerData = await PersonalDetailsShema.findOne({
      email: RideData.postedEmail,
    });

    await sendApproveEmail(
      response.userEmail,
      RideData.start,
      RideData.end,
      OwnerData.name,
      OwnerData.phonenumber
    );

    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
