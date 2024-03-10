import connectDb from "@/lib/connectDb";
import BookingModel from "@/Models/BookingModel";

async function getId(url) {
  const data = new URL(url);
  const id = await data.searchParams.get("id");

  return id;
}

export async function GET({ url }) {
  try {
    await connectDb();

    const id = await getId(url);

    const aggregationPipeLine = [
      [
        {
          $match: {
            RideId: `${id}`,
          },
        },
        {
          $lookup: {
            from: "personaldetails",
            localField: "userEmail",
            foreignField: "email",
            as: "data",
          },
        },
        {
          $unset: ["data._id"],
        },
      ],
    ];

    const data = await BookingModel.aggregate(aggregationPipeLine);

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 400 });
  }
}
