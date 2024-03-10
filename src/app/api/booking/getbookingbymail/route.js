import connectDb from "@/lib/connectDb";
import BookingModel from "@/Models/BookingModel";

export async function GET(request) {
  try {
    await connectDb();
    const url = new URL(request.url);

    const email = url.searchParams.get("email");

    const aggregationPipeLine = [
      {
        $match: {
          userEmail: `${email}`,
        },
      },
      {
        $addFields: {
          objId: { $toObjectId: "$RideId" },
        },
      },
      {
        $lookup: {
          from: "rides",
          localField: "objId",
          foreignField: "_id",
          as: "ridedetails",
        },
      },
      {
        $addFields: {
          ridedetails: {
            $first: "$ridedetails",
          },
        },
      },
      {
        $unset: ["ridedetails._id"],
      },
      {
        $lookup: {
          from: "personaldetails",
          localField: "postedEmail",
          foreignField: "email",
          as: "owner",
        },
      },
      {
        $addFields: {
          owner: { $first: "$owner" },
        },
      },
    ];

    const response = await BookingModel.aggregate(aggregationPipeLine);
    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
