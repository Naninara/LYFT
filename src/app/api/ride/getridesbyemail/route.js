import connectDb from "@/lib/connectDb";
import RideModel from "@/Models/RideModel";

async function getEmail(url) {
  const data = new URL(url);

  const email = data.searchParams.get("email");

  return email;
}

export async function GET({ url }) {
  try {
    await connectDb();

    const email = await getEmail(url);

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
    console.log(error);
    return Response.json(error, { status: 400 });
  }
}
