import { validationResult } from "express-validator";

export const checkValidationError = (req, res, next) => {
  const errors = validationResult(req); // перевіряє чи є помилки
  if (!errors.isEmpty()) {
    // масив помилок не пустий
    console.log(111);
    return res.status(400).json(errors.array());
  }
  next();
};
