import nodemailer from "nodemailer";
export default async function sendEmail(email) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "lyftbeta@gmail.com",
      pass: "sbxa ncwt kcya lmkv",
    },
  });

  const mailDetails = {
    from: "lyftbeta@gmail.com",
    to: "nmvmanikanta@gmail.com",
    subject: "Test mail",
    text: " testing mail",
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
