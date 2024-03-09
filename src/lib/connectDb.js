import mongoose from "mongoose";

export default async function connectDb() {
  let connection;
  if (connection) {
    return;
  }
  connection = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
}
