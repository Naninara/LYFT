import nodemailer from "nodemailer";
export default async function sendApproveEmail(
  email,
  start,
  end,
  ownername,
  phonenumber
) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "lyftbeta@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailDetails = {
    from: "lyftbeta@gmail.com",
    to: email,
    subject: "Woilaaa!!  You Booking Got Approved🎉",
    html: `<p>For The Booking</p> <p>From ${start} </p> <p>To: ${end}</p> <div>Owner details: name ${ownername} phoneNumber: ${phonenumber}</div><div><a href="https://lyft-beta.vercel.app/bookings"><button>Check Here</button></a></div>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve("Email sent sucessfully");
      }
    });
  });
}
