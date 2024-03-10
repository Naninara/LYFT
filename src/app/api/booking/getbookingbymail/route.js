import connectDb from "@/lib/connectDb";
import BookingModel from "@/Models/BookingModel";

async function getEmail(url) {
  const data = new URL(url);
  const email = await data.searchParams.get("email");
  return email;
}

export async function GET({ url }) {
  try {
    await connectDb();
    const email = await getEmail(url);

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
    console.log(error);
    return Response.json(error, { status: 400 });
  }
}
