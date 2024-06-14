const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const port = 3000;
const SECRET_KEY = "testuse";

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invaild Token");
  }
};

app.get("/", (req, res) => {
  res.send("hello World!");
});

app.get("/getName", (req, res) => {
  res.json({ name: "小明" });
});

app.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "user" && password === "password") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ token });
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
