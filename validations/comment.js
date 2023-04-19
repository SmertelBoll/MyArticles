import { body } from "express-validator";

export const commentCreateValidation = [
  body("text", "Введіть коментар").isLength({ min: 10 }).isString(),
  // body("postId")
];
