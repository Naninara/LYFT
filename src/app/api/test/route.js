import connectDb from "@/lib/connectDb";
import sendEmail from "@/lib/sendEmail";

export async function GET() {
  try {
    await connectDb();

    await sendEmail("nmvmanikanta@gmail.com")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    console.log("First");
    return new Response("Something");
  } catch (error) {
    console.log(error);
    return new Response("Something Wromg");
  }
}
