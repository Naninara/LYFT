import connectDb from "../../../../lib/connectDb";
import RideModel from "../../../../Models/RideModel";
export async function POST(request) {
  try {
    await connectDb();
    const requestBody = await request.json();

    console.log(requestBody);

    if (!requestBody.start || !requestBody.end || !requestBody.date) {
      return new Response("Bad Request", { status: 400 });
    }

    const aggregationPipeline = [
      {
        $match: {
          start: `${requestBody.start}`,
          end: `${requestBody.end}`,
          date: `${requestBody.date}`,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "postedEmail",
          foreignField: "email",
          as: "user",
        },
      },
      {
        $addFields: {
          user: {
            $first: "$user",
          },
        },
      },
    ];

    const data = await RideModel.aggregate(aggregationPipeline);

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
