const express = require("express");
const path = require("path");
const connectDb = require("../config/connectDb");
const bcrypt = require("bcryptjs");
const invalidRoute = require("./middlewares/invalidRoute");
const errorHandler = require("./middlewares/errorHandler");
const configPath = path.join(__dirname, "..", "config", ".env");
const tryCatchHandler = require("./helpers/tryCatchHandler");
const UserModel = require("./models/User");
const RolesModel = require("./models/Role");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/authMiddleware");
require("colors");
require("dotenv").config({
  path: configPath,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//registration - Сохранение пользевателя в базу данных
app.post(
  "/register",
  tryCatchHandler(async (req, res) => {
    //Получаем и валидируем данные юзера
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("provide all requred fiels");
    }

    //Ищем юзера в базе
    const candidate = await UserModel.findOne({ email });

    //если нашли - прокидываем ошибку
    if (candidate) {
      res.status(409);
      throw new Error("User allready exists");
    }
    //если не нашли - хэшируем пароль
    const hash = bcrypt.hashSync(password, 10);

    const roles = await RolesModel.findOne({ value: "USER" });
    //сохраняем в базу с захэшированым паролем

    const user = await UserModel.create({
      ...req.body,
      password: hash,
      roles: [roles.value],
    });
    res.status(201);
    res.json({ code: 201, message: "ok", data: { email: user.email } });
  })
);

//auth - Проверка данных которые ввел юзер с теми что есть в базе
app.post(
  "/login",
  tryCatchHandler(async (req, res) => {
    //Получаем и валидируем данные юзера
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("provide all requred fiels");
    }

    // //Ищем юзера в базе и расшифровуем пароль
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      res.status(400);
      throw new Error("invalid login or password");
    }

    const isValidPass = bcrypt.compareSync(password, candidate.password);

    // //если не нашли или не расшифровали пароль -invalid login or password
    if (!isValidPass) {
      res.status(400);
      throw new Error("invalid login or password");
    }

    // //если  нашли и расшифровали пароль - выдаем токен
    const token = generateToken({
      students: ["Alex", "Anna", "Andrey"],
      id: candidate._id,
      roles: candidate.roles,
    });
    // //сохраняем в базу с токеном
    candidate.token = token;

    await candidate.save();

    res.status(200);
    res.json({
      code: 200,
      message: "ok",
      data: { email: candidate.email, token: candidate.token },
    });
  })
);

function generateToken(data) {
  const payload = {
    ...data,
  };
  return jwt.sign(payload, "cat", { expiresIn: "12h" });
}

//authorization - Проверка прав доступа

//logout - Выход из приложения
app.patch(
  "/logout",
  authMiddleware,
  tryCatchHandler(async (req, res) => {
    // Получить информацию о юзере
    const { id } = req.user;
    console.log(req.user);
    //  Сбросить токен
    const user = await UserModel.findById(id);
    user.token = null;
    await user.save();
    res.status(200);
    res.json({
      code: 200,
      message: "Logout succsess",
    });
  })
);

app.use("/api/v1", require("./routes/drinksRoutes"));
app.use("/admin", require("./routes/adminRoutes"));


app.use(invalidRoute);
app.use(errorHandler);
connectDb();
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`.green.italic.bold);
});
