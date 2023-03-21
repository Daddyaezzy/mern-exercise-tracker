const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise.model");

router.get("/", (req, res) => {
  Exercise.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json(`Error: ${err}`));
});

router.post("/add", (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({ username, description, duration, date });
  newExercise
    .save()
    .then((result) => res.json(result))
    .catch((err) => {
      res.status(404).json(`Error: ${err}`);
    });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  Exercise.findById(id)
    .then((result) => res.json(result))
    .catch((err) => res.status(404).json(`Error: ${err}`));
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Exercise.findByIdAndDelete(id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(404).json(`Error: ${err}`));
});

router.post("/update/:id", (req, res) => {
  let id = req.params.id;
  Exercise.findById(id)
    .then((exercise) => {
      if (req.body.username) {
        exercise.username = req.body.username;
      }
      if (req.body.description) {
        exercise.description = req.body.description;
      }
      if (req.body.duration) {
        exercise.duration = Number(req.body.duration);
      }
      if (req.body.date) {
        exercise.date = Date.parse(req.body.date);
      }

      exercise
        .save()
        .then((result) => res.json(result))
        .catch((err) => res.status(404).json(`Error: ${err}`));
    })
    .catch((err) => res.status(404).json(`Error: ${err}`));
});

module.exports = router;
