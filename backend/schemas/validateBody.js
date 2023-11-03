const Joi = require("joi");

const addSchema = Joi.object({
  title: Joi.string().required(),
  value: Joi.string(),
  price: Joi.number(),
  adault: Joi.boolean().required(),
});

module.exports = addSchema;
