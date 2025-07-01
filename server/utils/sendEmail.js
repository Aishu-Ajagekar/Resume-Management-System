const nodemailer = require("nodemailer");

const sendMail = async (email, sub, content) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailInfo = await transporter.sendMail({
    from: "Aishwarya Ajagekar",
    to: email,
    subject: sub,
    html: content,
  });

  console.log("Mail is sent :", mailInfo);
};

module.exports = sendMail;
