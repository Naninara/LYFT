import connectDb from "@/lib/connectDb";
import BookingModel from "@/Models/BookingModel";

export async function GET(request) {
  try {
    await connectDb();
    const url = new URL(request.url);

    const id = url.searchParams.get("id");

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
