"use-strict";

const TreasureModel = require("../../../models/Treasure");
const response = require("../../../configs/response");

module.exports = {
  show: async (req, res) => {
    try {
      const treasure = await TreasureModel.findById(req.params.id);

      const data = {
        status: true,
        message: "Data succesfully retrieved",
        results: treasure,
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
