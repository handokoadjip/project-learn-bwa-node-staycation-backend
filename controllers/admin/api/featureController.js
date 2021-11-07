"use-strict";

const FeatureModel = require("../../../models/Feature");
const response = require("../../../configs/response");

module.exports = {
  show: async (req, res) => {
    try {
      const feature = await FeatureModel.findById(req.params.id);

      const data = {
        status: true,
        message: "Data succesfully retrieved",
        results: feature,
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
