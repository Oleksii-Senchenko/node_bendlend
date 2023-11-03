const DrinkModel = require("../models/Drink");
const tryCatchHandler = require("../helpers/tryCatchHandler");

class DrinksContoller {
  add = tryCatchHandler(async (req, res) => {
    console.log(req.body);
    const { title, adault } = req.body;
    const { id } = req.user;
    if (!title || !adault) {
      res.status(400);
      throw new Error("provide all requred fiels");
    }
    const drink = await DrinkModel.create({ ...req.body, owner: id });
    res.status(201);
    res.json({ code: 201, message: "ok", data: drink });
  });

  getAll = tryCatchHandler(async (req, res) => {
    const { id } = req.user;
    const drinks = await DrinkModel.find({ owner: id });
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
