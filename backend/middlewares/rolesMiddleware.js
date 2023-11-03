const jwt = require("jsonwebtoken");
module.exports = (rolesArr) => {
  return (req, res, next) => {
    try {

      
      const { roles } = req.user;
      //Передаем информацию из токена дальше
      console.log(rolesArr);
      console.log(roles);
      let hasRole = false;
      rolesArr.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        res.status(404);
        throw new Error("Forbiden");
      }
      next();
    } catch (error) {
      res.status(404);
      res.json({ code: 404, message: error.message });
    }
  };
};
// {
//   students: [ 'Alex', 'Anna', 'Andrey' ],
//   id: '65453ec8a919a7e86fc41c93',
//   roles: [ 'ADMIN' ],
//   iat: 1699037151,
//   exp: 1699080351
// }
