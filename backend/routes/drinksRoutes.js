const drinksController = require("../controllers/drinksController");
const validateBodyClosure = require("../middlewares/validateBody");

const drinksRoutes = require("express").Router();
const addSchema = require("../schemas/validateBody");
//Add drink
drinksRoutes.post(
  "/drinks",
  validateBodyClosure(addSchema),
  drinksController.add
);

//GetAll drinks
drinksRoutes.get("/drinks", drinksController.getAll);

//Get One drink
drinksRoutes.get("/drinks/:id", drinksController.getOne);

//update drink
drinksRoutes.put("/drinks/:id", drinksController.update);

//delete drink
drinksRoutes.delete("/drinks/:id", drinksController.remove);

module.exports = drinksRoutes;
