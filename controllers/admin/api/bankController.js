"use-strict";

const BankModel = require("../../../models/Bank");
const response = require("../../../configs/response");

module.exports = {
  show: async (req, res) => {
    try {
      const bank = await BankModel.findById(req.params.id);

      const data = {
        status: true,
        message: "Data succesfully retrieved",
        results: bank,
      };

      response(200, data, res);
    } catch (error) {
      const data = {
        status: false,
        message: "Data failed retrieved",
        results: error,
      };

      response(404, data, res);
    }
  },
};
