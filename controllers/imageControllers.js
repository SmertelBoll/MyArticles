import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import mime from "mime-types";

import ImageModel from "../models/image.js";

export const uploadFile = async (req, res) => {
  try {
    // Отримуємо дані з форми, включаючи завантажене зображення
    const { file } = req;

    // Визначаємо тип MIME зображення
    const contentType = mime.lookup(file.path);

    // Створюємо новий документ зображення
    const newImage = new ImageModel({
      data: fs.readFileSync(file.path),
      contentType,
    });

    // Зберігаємо документ в MongoDB
    await newImage.save();

    const buffer = fs.readFileSync(file.path);
    const image = new Buffer.from(buffer, "base64");
    const dataUrl = image.toString();
    // const dataUrl = `data:${contentType};base64,${image.toString("base64")}`;
    console.log(dataUrl);

    res.json({
      id: newImage._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Невдалося завантажити файл",
    });
  }
};

export const download = async (req, res) => {
  try {
    const { fileId } = req.params;

    // Шукаємо зображення з ім'ям filename в базі даних
    const image = await ImageModel.findById(fileId);

    if (!image) {
      return res.status(404).send("Зображення не знайдено");
    }
    // console.log(image._id, image.contentType);

    res.set("Content-Type", image.contentType);
    res.send(image);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Не вдалося отримати зображення");
  }
};
