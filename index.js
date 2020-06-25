const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");

const authService = require("./service/authService");
const authMiddlewares = require("./middlewares/authenticate");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")));

let jogs = [];

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/v1/auth/login", async (req, res) => {
  const id = req.body.id;

  try {
    const token = await authService.generateAuthToken(id);

    return res.status(200).send({ token });
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.post("/v1/jogs/", authMiddlewares.authenticate, async (req, res) => {
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

app.get("/v1/jogs/", authMiddlewares.authenticate, async (req, res) => {
  return res.status(200).send({ jogs });
});

app.listen(process.env.PORT || 3000, () => console.log("Server is working..."));
