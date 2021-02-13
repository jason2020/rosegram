console.log("Fire fire");
// https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb
const { Sequelize, DataTypes } = require("sequelize");
// const sendEmailWithNodemailer = require("./nodemailer.service");
const nodemailer = require("nodemailer");
const inlineBase64 = require("nodemailer-plugin-inline-base64");

// Setup DB
const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USERNAME, process.env.SQL_PASSWORD, {
  host: process.env.SQL_HOST,
  dialect: "postgres",
});

// Card Model
const Card = sequelize.define(
  "Card",
  {
    // Model attributes are defined here
    message: {
      type: DataTypes.TEXT,
      // allowNull defaults to true
      allowNull: false,
    },
    recipientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipientEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardDesign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moderated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    censored: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    senatorVisited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    visitCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    // Other model options go here
  }
);

function waterfallOverArray(list, iterator, callback) {
  let nextItemIndex = 0; // keep track of the index of the next item to be processed
  function report() {
    nextItemIndex += 1;
    // if nextItemIndex equals the number of items in list, then we're done
    if (nextItemIndex === list.length) callback();
    // otherwise, call the iterator on the next item
    else iterator(list[nextItemIndex], report);
  }
  // instead of starting all the iterations, we only start the 1st one
  iterator(list[0], report);
}

const { FRONTEND_DOMAIN } = process.env;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "<>", // generated ethereal user
    pass: "<>", // generated ethereal password
  },
});

// Test connection to DB
try {
  sequelize.authenticate().then(() => {
    sequelize.sync({ alter: false }).then(async () => {
      console.log("All models synced successfully.");

      try {
        let arr = [];
        const cards = await Card.findAll({ where: { senatorVisited: false }, limit: 400 });
        waterfallOverArray(
          cards,
          (card, report) => {
            const jsonCard = card.toJSON();
            console.log(jsonCard.id, jsonCard.recipientEmail);
            arr.push(jsonCard.id);
            try {
              transporter.use("compile", inlineBase64());
              // send mail with defined transport object
              transporter
                .sendMail({
                  from: "<>", // sender address
                  to: "<>", // list of receivers
                  subject: `You Received a Rosegram!`, // Subject line
                  html: `<html><body>
                        <p>To: ${card.recipientEmail}</p>
                        <p>You received a rosegram! View it here: </p>
                        <a href="${FRONTEND_DOMAIN}/card/${card.cardUrl}">${FRONTEND_DOMAIN}/card/${card.cardUrl}</a>
                        </body></html>`, // html body
                })
                .then(() => {
                  transporter
                    .sendMail({
                      from: "<>", // sender address
                      to: process.env.ROSEGRAM_EMAIL, // list of receivers
                      subject: `You Received a Rosegram!`, // Subject line
                      html: `<html><body>
                              <p>To: ${card.recipientEmail}</p>
                              <p>You received a rosegram! View it here: </p>
                              <a href="${FRONTEND_DOMAIN}/card/${card.cardUrl}">${FRONTEND_DOMAIN}/card/${card.cardUrl}</a>
                              </body></html>`, // html body
                    })
                    .then(() => {
                      // eslint-disable-next-line no-param-reassign
                      card.senatorVisited = true;
                      card
                        .save()
                        .then(() => {
                          report();
                        })
                        .catch((e) => {
                          console.log(e);
                          console.log(arr);
                        });
                    })
                    .catch((e) => {
                      console.log(e);
                      console.log(arr);
                    });
                })
                .catch((e) => {
                  console.log(e);
                  console.log(arr);
                });
            } catch (e) {
              console.log(e);
              console.log(arr);
            }
          },
          () => {
            console.log("FINISHED!");
            console.log(arr);
          }
        );
      } catch (e) {
        console.log(e);
      }
    });

    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
