import { body } from "express-validator";

export const postCreateValidation = [
  body("title", "Заголовок повинен містити мінімум 3 символів").isLength({ min: 3 }).isString(),
  body("text", "Текст повинен містити мінімум 10 символів").isLength({ min: 10 }).isString(),
  body("tags", "Неправильний формат тегів").optional().isArray(),
  body("imageUrl", "Неправильне посилання на зображення").optional().isURL(),
];
