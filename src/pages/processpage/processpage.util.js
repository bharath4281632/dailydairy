import Joi from "@hapi/joi";

export const schema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  apartmentName: Joi.string(),
  isCashOnDelivery: Joi.bool().required(),
  phoneNo: Joi.string().required()
});

export const inputField = [
  { name: "name", label: "Name" },
  { name: "address", label: "Address", rows: 4 },
  { name: "apartmentName", label: "Apartment Name (optional)" },
  { name: "phoneNo", label: "Phone Number" }
];
