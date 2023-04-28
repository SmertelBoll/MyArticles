import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

import UserModel from "../models/user.js";
import ImageModel from "../models/image.js";

const bcrypt_salt = process.env.BCRYPT_SALT;

export const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(bcrypt_salt); // шифрування
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
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ title: "Authorization error", message: "the user with this email is already registered" });
    }
    res.status(500).json({ title: "Authorization error", message: "failed to register" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }).populate("avatar").exec();

    if (!user) {
      return res.status(404).json({ title: "Authorization error", message: "user not found" });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(400).json({ title: "Authorization error", message: "wrong login or password" });
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
    res.status(500).json({ title: "Authorization error", message: "failed to authenticate" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate("avatar").exec();

    if (!user) {
      return res.status(404).json({ title: "Authorization error", message: "user not found" });
    }

    res.json({
      ...user._doc,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ title: "Authorization error", message: "failed to get data" });
  }
};
