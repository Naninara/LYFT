import connectDb from "../../../../lib/connectDb";

export async function GET() {
  await connectDb()
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });

  return new Response("Something ");
}
