"use-strict";

const VacationModel = require("../../../models/Vacation");

const response = require("../../../configs/response");

module.exports = {
  show: async (req, res) => {
    try {
      const vacation = await VacationModel.findById(req.params.id)
        .populate({ path: "imageId", select: "id imageUrl" })
        .populate({
          path: "featureId",
          select: "id name qty imageUrl",
        })
        .populate({
          path: "treasureId",
          select: "id name category imageUrl",
        })
        .populate({
          path: "categoryId",
          select: "id name",
        });

      let results = {
        _id: vacation._id,
        name: vacation.name,
        imageUrls: vacation.imageId.map((image) => ({
          _id: image.id,
          url: image.imageUrl,
        })),
        country: vacation.country,
        city: vacation.city,
        price: vacation.price,
        unit: vacation.unit,
        isPopular: vacation.isPopular,
        description: vacation.desc,
        features: vacation.featureId.map((feature) => ({
          _id: feature._id,
          qty: feature.qty,
          name: feature.name,
          imageUrl: feature.imageUrl,
        })),
        treasures: vacation.treasureId.map((treasure) => ({
          _id: treasure._id,
          name: treasure.name,
          category: treasure.category,
          imageUrl: treasure.imageUrl,
        })),
      };

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

  mostPicked: async (req, res) => {
    try {
      const vacations = await VacationModel.find()
        .limit(5)
        .select("_id name imageId country city price unit")
        .populate({
          path: "imageId",
          select: "imageUrl",
          perDocumentLimit: 1,
        });

      let results = [];
      vacations.map((vacation) => {
        results.push({
          _id: vacation._id,
          name: vacation.name,
          imageUrl: vacation.imageId[0].imageUrl,
          country: vacation.country,
          city: vacation.city,
          price: vacation.price,
          unit: vacation.unit,
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
};
