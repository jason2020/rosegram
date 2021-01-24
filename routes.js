const express = require("express");
const CardController = require("./cardController.js");

const router = express.Router();

router.route("/cards").post(CardController.createCard);

router.route("/cards/:cardUrl").get(CardController.getCard);

module.exports = router;
