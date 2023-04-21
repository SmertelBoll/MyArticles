import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

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
import {
  createComment,
  getAllCommentsByPost,
  getAllCommentsByUser,
  removeComment,
} from "./controllers/commentControllers.js";
import { commentCreateValidation } from "./validations/comment.js";

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

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    // помилки, куди загружати
    callBack(null, "uploads");
  },
  filename: (req, file, callBack) => {
    callBack(null, file.originalname);
  },
});
const upload = multer({ storage });

// Настройки
app.use(express.json()); // дозволяє читати json
app.use(cors());
app.use("/uploads", express.static("uploads")); // щоб діставати статичні файли з папки (в гугл наприклад)

// Запроси
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/auth/register", registerValidation, checkValidationError, registerUser);
app.post("/auth/login", loginValidation, checkValidationError, loginUser);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  try {
    const newFilename = uuidv4() + "." + req.file.originalname.split(".").pop();
    const oldPath = req.file.path;
    const newPath = req.file.destination + "/" + newFilename;

    fs.rename(oldPath, newPath, (error) => {
      if (error) {
        console.log(error);
        res.status(400).json({
          message: "Невдалося перейменувати файл",
        });
      } else {
        res.json({
          url: `/uploads/${newFilename}`,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Невдалося завантажити файл",
    });
  }
});
app.get("/download/:filename", (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = "uploads/" + filename;
    res.download(filePath);
  } catch (error) {
    res.status(400).json({
      message: "Невдалося скачати файл",
    });
  }
});

app.get("/posts", getAllPosts);
app.get("/posts/:id", getOnePost);
app.post("/posts", checkAuth, postCreateValidation, checkValidationError, createPost);
app.delete("/posts/:id", checkAuth, removePost);
app.patch("/posts/:id", checkAuth, postCreateValidation, checkValidationError, updatePost);

app.get("/comments/:postId", getAllCommentsByPost);
app.get("/comments", checkAuth, getAllCommentsByUser);
app.post("/comments", checkAuth, commentCreateValidation, checkValidationError, createComment);
app.delete("/comments/:id", checkAuth, removeComment);

// на якому хості запускаємо, функція що робити якщо помилка
app.listen(4444, (err) => {
  if (err) {
    console.log("server error");
    console.log(err);
  }

  console.log("server ok");
});
