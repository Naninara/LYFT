import connectDb from "@/lib/connectDb";
import RideModel from "@/Models/RideModel";

export async function GET(request) {
  try {
    await connectDb();
    const url = new URL(request.url);

    const email = await url.searchParams.get("email");

    const aggregationPipeLine = [
      {
        $match: {
          postedEmail: `${email}`,
        },
      },
      {
        $addFields: {
          _id: { $toString: "$_id" },
        },
      },
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "RideId",
          as: "bookings",
        },
      },

      {
        $sort: {
          date: -1,
        },
      },
    ];

    const response = await RideModel.aggregate(aggregationPipeLine);

    return Response.json(response, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
