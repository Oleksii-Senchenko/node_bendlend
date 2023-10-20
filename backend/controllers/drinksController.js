const DrinkModel = require("../models/Drink");
const tryCatchHandler = require("../helpers/tryCatchHandler");

class DrinksContoller {
  add = tryCatchHandler(async (req, res) => {
    const { title, adult } = req.body;
    if (!title || !adult) {
      res.status(400);
      throw new Error("provide all requred fiels");
    }
    const drink = await DrinkModel.create({ ...req.body });
    res.status(201);
    res.json({ code: 201, message: "ok", data: drink });
  });

  getAll = tryCatchHandler(async (req, res) => {
    const drinks = await DrinkModel.find({});
    res.status(200);
    res.json({ code: 200, message: "ok", data: drinks, qty: drinks.length });
  });

  getOne = (req, res) => {
    res.send("getOne");
  };
  update = (req, res) => {
    res.send("update");
  };
  remove = (req, res) => {
    res.send("remove");
  };
}
module.exports = new DrinksContoller();
