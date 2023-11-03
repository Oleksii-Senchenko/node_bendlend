const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //Получаем токен
    const [type, token] = req.headers.authorization.split(" ");
    if (type === "Bearer" && token) {
      //Расшифровываем токен
      const decoded = jwt.verify(token, "cat");
      //Передаем информацию из токена дальше
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401);
    res.json({ code: 401, message: error.message });
  }
};
// {
//     students: [ 'Alex', 'Anna', 'Andrey' ],
//     id: '65452e07192c3935ab042ff1',
//     iat: 1699034611,
//     exp: 1699077811
//   }
