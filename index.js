import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { loginValidation, registerValidation } from "./validations/auth.js";
import { checkValidationError } from "./utils/checkValidationError.js";
import { getMe, loginUser, registerUser } from "./controllers/userControllers.js";
import { checkAuth } from "./utils/checkAuth.js";
import {
  createPost,
  getAllPosts,
  getOnePost,
  removePost,
  updatePost,
} from "./controllers/postControllers.js";
import { postCreateValidation } from "./validations/post.js";

// підключаємось до бази даних
mongoose
  .connect(
    "mongodb+srv://sholop2113:2wWd2RjUy6zggyIP@cluster0.wm49rqk.mongodb.net/myarticles?retryWrites=true&w=majority"
  )
  // перевіряємо підключення
  .then(() => {
    console.log("DB ok");
  })
  // якщо помилка
  .catch((err) => {
    console.log("DB error", err);
  });

// Створюємо програму
const app = express();

// Настройки
app.use(express.json()); // дозволяє читати json

// Запроси
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/auth/register", registerValidation, checkValidationError, registerUser);
app.post("/auth/login", loginValidation, checkValidationError, loginUser);
app.get("/auth/me", checkAuth, getMe);

app.get("/posts", getAllPosts);
app.get("/posts/:id", getOnePost);
app.post("/posts", checkAuth, postCreateValidation, createPost);
app.delete("/posts/:id", checkAuth, removePost);
app.patch("/posts/:id", checkAuth, updatePost);

// на якому хості запускаємо, функція що робити якщо помилка
app.listen(4444, (err) => {
  if (err) {
    console.log("server error");
    console.log(err);
  }

  console.log("server ok");
});
