import nodemailer from "nodemailer";
export default async function SendBookingEmail(email, start, end) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "lyftbeta@gmail.com",
      pass: "sbxa ncwt kcya lmkv",
    },
  });

  const mailDetails = {
    from: "lyftbeta@gmail.com",
    to: email,
    subject: "Cheeerss!!  You Got A Booking🎉",
    html: `<p>For The Booking</p> <p>From ${start} </p> <p>To: ${end}</p> <div><a href="https://lyft-beta.vercel.app/postings"><button>Check Here</button></a></div>`,
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
