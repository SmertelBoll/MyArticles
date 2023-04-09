import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// на якому хості запускаємо, функція що робити якщо помилка
app.listen(4444, (err) => {
  if (err) {
    console.log("server error");
    console.log(err);
  }

  console.log("server ok");
});
