import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неправильна пошта").isEmail(),
  body("password", "Пароль повинен містити мінімум 5 символів").isLength({ min: 5 }),
  body("fullName", "Ім'я повинне містити мінімум 2 символи").isLength({ min: 2 }),
  body("avatarUrl", "Неправильне посилання на аватарку").optional().isURL(), // optional - якщо є, то провір, якщо немає то все одно
];

export const loginValidation = [
  body("email").isEmail(),
  body("password", "пароль повинен містити мінімум 5 символів").isLength({
    min: 5,
  }),
];