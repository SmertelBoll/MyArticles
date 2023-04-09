import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json()); // дозволяє читати json

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/auth/login", (req, res) => {
  console.log(req.body);

  const token = jwt.sign(
    {
      email: req.body.email,
    },
    "secret-key"
  );

  res.json({
    success: true,
    token,
  });
});

// на якому хості запускаємо, функція що робити якщо помилка
app.listen(4444, (err) => {
  if (err) {
    console.log("server error");
    console.log(err);
  }

  console.log("server ok");
});
