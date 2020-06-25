const express = require("express");
const router = express.Router();

const authMiddlewares = require("../middlewares/authenticate");

let jogs = [];

router.post("/", authMiddlewares.authenticate, async (req, res) => {
  try {
    const distance = req.body.distance;
    const time = req.body.time;
    const date = req.body.date;

    if (distance.length && time.length && date.length) {
      jogs.push({ id: jogs.length, distance, time, date });
      return res
        .status(201)
        .send({ id: jogs.length - 1, distance, time, date });
    }

    return res.status(400).send();
  } catch (error) {
    jogs = [];
    return res.status(400).send(error);
  }
});

router.get("/", authMiddlewares.authenticate, async (req, res) => {
  return res.status(200).send({ jogs });
});

module.exports = router;
