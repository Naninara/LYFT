import mongoose from "mongoose";

export default async function connectDb() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
}
