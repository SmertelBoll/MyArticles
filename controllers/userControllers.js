import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/user.js";

export const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10); // шифрування
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret-key", // ключ шифрування
      {
        expiresIn: "30d", // скільки токен буде існувати
      }
    );

    res.json({
      ...user._doc,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося зареєструватися",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "користувач не знайдений",
      });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "неправильний логін чи пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret-key", // ключ шифрування
      {
        expiresIn: "30d", // скільки токен буде існувати
      }
    );

    // повертаємо дані
    res.json({
      ...user._doc,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "не вдалося авторизуватись",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Користувач не знайдений",
      });
    }

    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Невдалося отримати дані",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Користувач не знайдений",
      });
    }

    const { _id, fullName, avatarUrl } = user;

    res.json({
      _id,
      fullName,
      avatarUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Невдалося отримати дані",
    });
  }
};
