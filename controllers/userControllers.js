import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/user.js";
import ImageModel from "../models/image.js";

export const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10); // шифрування
    const hash = await bcrypt.hash(password, salt);

    const avatarId = req.body.avatarId;

    const image = await ImageModel.findById(avatarId);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatar: image,
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
    const user = await UserModel.findOne({ email: req.body.email }).populate("avatar").exec();

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
    const user = await UserModel.findById(req.userId).populate("avatar").exec();

    if (!user) {
      return res.status(404).json({
        message: "Користувач не знайдений",
      });
    }

    res.json({
      ...user._doc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Невдалося отримати дані",
    });
  }
};
