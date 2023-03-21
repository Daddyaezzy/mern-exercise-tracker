const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/", (req, res) => {
  User.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json(`Error:${err}`));
});

router.post("/add", (req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(404).json(`Error:${err}`));
});

module.exports = router;
