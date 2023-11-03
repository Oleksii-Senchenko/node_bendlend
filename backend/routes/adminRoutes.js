const rollesController = require("../controllers/rollesController");
const authMiddleware = require("../middlewares/authMiddleware");
const rolesMiddleware = require("../middlewares/rolesMiddleware.JS");

const adminRoutes = require("express").Router();

//Добавить роль
adminRoutes.patch(
  "/addrole",
  authMiddleware,
  rolesMiddleware(["ADMIN"]),
  rollesController.add
);
adminRoutes.patch(
  "/updaterole",
  authMiddleware,
  rolesMiddleware(["ADMIN"]),
  rollesController.update
);
module.exports = adminRoutes;
