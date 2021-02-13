const nodemailer = require("nodemailer");
const inlineBase64 = require("nodemailer-plugin-inline-base64");
// async..await is not allowed in global scope, must use a wrapper

const { FRONTEND_DOMAIN } = process.env;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "<>", // generated ethereal user
    pass: "<>", // generated ethereal password
  },
});

async function sendEmailWithNodemailer(cardUrl, recipientEmail, callback) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // create reusable transporter object using the default SMTP transport

  // https://github.com/mixmaxhq/nodemailer-plugin-inline-base64
  transporter.use("compile", inlineBase64());
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "<>", // sender address
    to: "<>", // list of receivers
    subject: `You Received a Rosegram!`, // Subject line
    html: `<html><body>
        <p>To: ${recipientEmail}</p>
        <p>You received a rosegram! View it here: </p>
        <a href="${FRONTEND_DOMAIN}/card/${cardUrl}">${FRONTEND_DOMAIN}/card/${cardUrl}</a>
        </body></html>`, // html body
  });

  const info2 = await transporter.sendMail({
    from: "<>", // sender address
    to: process.env.ROSEGRAM_EMAIL, // list of receivers
    subject: `You Received a Rosegram!`, // Subject line
    html: `<html><body>
        <p>To: ${recipientEmail}</p>
        <p>You received a rosegram! View it here: </p>
        <a href="${FRONTEND_DOMAIN}/card/${cardUrl}">${FRONTEND_DOMAIN}/card/${cardUrl}</a>
        </body></html>`, // html body
  });
  // console.log("NODEMAILER SERVICE", info, info2);

  callback();
}

module.exports = sendEmailWithNodemailer;
