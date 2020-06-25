const express = require("express");
const router = express.Router();

const authService = require("../service/authService");

router.post("/login", async (req, res) => {
  const id = req.body.id;

  try {
    const token = await authService.generateAuthToken(id);

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
