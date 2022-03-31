require("dotenv").config();
const nodemailer = require("nodemailer");

const user = process.env.user;
const pass = process.env.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

module.exports.sendConfirmationEmail = (email,subject, htmlbody) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: subject,
    html: htmlbody
  }).catch(err => console.log(err));
};

