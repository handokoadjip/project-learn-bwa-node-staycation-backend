"use-strict";

const CategoryModel = require("../../../models/Category");

const response = require("../../../configs/response");

module.exports = {
  index: async (req, res) => {
    try {
      const categories = await CategoryModel.find()
        .select("_id name vacationId")
        .populate({
          path: "vacationId",
          select: "_id name imageId country city isPopular",
          perDocumentLimit: 4,
          option: {
            sort: { sumBooking: -1 },
          },
          populate: {
            path: "imageId",
            select: "imageUrl",
            perDocumentLimit: 1,
          },
        });

      let results = [];
      categories.map((category) => {
        results.push({
          _id: category._id,
          name: category.name,
          items: category.vacationId.map((vacation, index) => ({
            _id: vacation._id,
            name: vacation.name,
            imageUrl: vacation.imageId[0].imageUrl,
            country: vacation.country,
            city: vacation.city,
            isPopular: index === 0 ? true : false,
          })),
        });
      });

      const data = {
        status: true,
        message: "Data succesfully retrieved",
        results,
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
  show: async (req, res) => {
    try {
      const category = await CategoryModel.findById(req.params.id);

      const data = {
        status: true,
        message: "Data succesfully retrieved",
        results: category,
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
