import connectDb from "@/lib/connectDb";
import RideModel from "@/Models/RideModel";
import mongoose from "mongoose";
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

export async function GET(request) {
  try {
    await connectDb();
    const url = new URL(request.url);

    const id = url.searchParams.get("id");
    const objId = new mongoose.Types.ObjectId(id);

    const aggregationPipeline = [
      {
        $match: {
          _id: objId,
        },
      },
      {
        $lookup: {
          from: "personaldetails",
          localField: "postedEmail",
          foreignField: "email",
          as: "postedBy",
        },
      },
      {
        $addFields: {
          postedBy: {
            $first: "$postedBy",
          },
        },
      },
      {
        $unset: ["postedBy._id", "postedBy.isEmailVerified", "postedBy.role"],
      },
    ];

    const information = await RideModel.aggregate(aggregationPipeline);
    return Response.json(information, { status: 200 });
  } catch (err) {
    return Response.json(err, { status: 400 });
  }
}
