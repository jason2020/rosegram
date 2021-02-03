const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

function sendRosegram(cardUrl, recipientEmail) {
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const params = {
    Destination: {
      ToAddresses: [process.env.ROSEGRAM_EMAIL], // Email address/addresses that you want to send your email
    },
    ConfigurationSetName: "test",
    Message: {
      Body: {
        Html: {
          // HTML Format of the email
          Charset: "UTF-8",
          // Body of the email
          // TODO style
          Data: `<html><body>
              <p>To: ${recipientEmail}</p>
              <p>You received a rosegram! View it here: </p>
              <a href="http://${process.env.FRONTEND_DOMAIN}/card/${cardUrl}">http://${process.env.FRONTEND_DOMAIN}/card/${cardUrl}</a>
            </body></html>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: `You received a rosegram! You can view it here: ${process.env.FRONTEND_DOMAIN}/card/${cardUrl}`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "You Received a Rosegram!",
      },
    },
    Source: process.env.ROSEGRAM_EMAIL,
  };

  const sendEmail = ses.sendEmail(params).promise();

  sendEmail
    .then((data) => {
      // console.log("email submitted to SES", data);
    })
    .catch((error) => {
      console.log("AWS SES ERROR", error);
    });
}

module.exports = sendRosegram;
