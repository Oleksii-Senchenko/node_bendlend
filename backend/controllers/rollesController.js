const tryCatchHandler = require("../helpers/tryCatchHandler");
const RoleModel = require("../models/Role");
const UserModel = require("../models/User");

class RollesController {
  add = tryCatchHandler(async (req, res) => {
    const role = await RoleModel.create({ ...req.body });


    res.status(201);
    res.json({ code: 201, message: "ok", data: role });
  });

  update = tryCatchHandler(async (req, res) => {
    const { id } = req.user;

    const user = await UserModel.findById(id);
    const role = await RoleModel.findOne({ value: "CTO" });

    if (role && user) {
      user.roles.push(role.value);
      await user.save();
    }
    res.status(200);
    res.json({ code: 200, message: "ok", data: user.roles });
  });
}
module.exports = new RollesController();
