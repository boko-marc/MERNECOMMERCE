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

module.exports.sendConfirmationEmail = (name, email,id) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Welcome",
    html: `<h1>This email help you to reset password</h1>
        <h2>Hello ${name}</h2>
        <p>You have started the password change process, click on the link below to finalize the process! Thank you</p></br>
        <a href=${process.env.urlResetPassword}${id}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
};