const drinksController = require("../controllers/drinksController");
const authMiddleware = require("../middlewares/authMiddleware");
const rolesMiddleware = require("../middlewares/rolesMiddleware.JS");
const validateBodyClosure = require("../middlewares/validateBody");

const drinksRoutes = require("express").Router();
const addSchema = require("../schemas/validateBody");
//Add drink
drinksRoutes.post(
  "/drinks",
  validateBodyClosure(addSchema),
  authMiddleware,
  drinksController.add
);
// ["ADMIN", "MODERATOR", "CTO", "DELIVERY", "USER"]
//GetAll drinks
drinksRoutes.get(
  "/drinks",
  authMiddleware,
  rolesMiddleware(["ADMIN", "MODERATOR", "USER"]),
  drinksController.getAll
);

//Get One drink
drinksRoutes.get("/drinks/:id", drinksController.getOne);

//update drink
drinksRoutes.put("/drinks/:id", drinksController.update);

//delete drink
drinksRoutes.delete("/drinks/:id", drinksController.remove);

module.exports = drinksRoutes;
