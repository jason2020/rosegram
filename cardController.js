// https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb
const { Sequelize, DataTypes } = require("sequelize");
const validator = require("validator");

// Setup DB
const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USERNAME, process.env.SQL_PASSWORD, {
  host: process.env.SQL_HOST,
  dialect: "postgres",
});

// Test connection to DB
try {
  sequelize.authenticate().then(() => {
    sequelize.sync({ alter: true }).then(() => console.log("All models synced successfully."));
    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Card Model
const Card = sequelize.define(
  "Card",
  {
    // Model attributes are defined here
    message: {
      type: DataTypes.STRING,
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
  },
  {
    // Other model options go here
  }
);

class CardController {
  static async createCard(req, res) {
    try {
      // Validation
      let errorMessage = "";
      ["message", "recipientName", "recipientEmail", "cardDesign"].forEach((requiredField) => {
        if (!req.body[requiredField]) errorMessage += `The field ${requiredField} is required.\n`;
      });
      if (errorMessage) return res.status(422).send(errorMessage);

      // recipientEmail must be email
      if (!validator.isEmail(req.body.recipientEmail))
        return res.status(422).send("Recipient Email is an invalid email.");

      // Store POST Request Body
      const { message, recipientName, recipientEmail, sender, cardDesign } = req.body;

      // Santization
      const sanitized = {
        recipientEmail: validator.normalizeEmail(recipientEmail),
        cardDesign: +cardDesign,
      };

      // Generate Card URL
      const cardUrl = `${escape(recipientName)}-${Math.random().toString(36).substring(7)}`;

      // Create the Card in DB
      const card = await Card.create({
        message,
        recipientName,
        recipientEmail: sanitized.recipientEmail,
        sender,
        cardUrl,
        cardDesign: sanitized.cardDesign,
      });

      // Return successfully-created card
      return res.status(201).json(card.toJSON());
    } catch (e) {
      // Unexpected error occurred
      console.log(e);
      return res.status(500).json(e);
    }
  }

  static async getCard(req, res) {
    try {
      // Validation
      if (!req.params.cardUrl) return res.status(422).send("Missing cardUrl URL parameter.");

      // Find the card in the DB
      const card = await Card.findOne({ where: { cardUrl: req.params.cardUrl } });

      // Check for 404
      if (!card) return res.status(404).send(`Card with card url ${req.params.cardUrl} not found!`);

      // Return found card
      return res.status(200).json(card.toJSON());
    } catch (e) {
      // Unexpected error occurred
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

module.exports = CardController;
