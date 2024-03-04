import React from "react";
import connectDb from "../../../../lib/connectDb";
export async function GET() {
  try {
    await connectDb();

    return Response.json({ msg: "DB CONNECTED" });
  } catch (e) {
    return Response.json({ message: e });
  }
}
