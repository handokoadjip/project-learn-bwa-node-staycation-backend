"use-strict";

const VacationModel = require("../../../models/Vacation");
const BookingModel = require("../../../models/Booking");
const TreasureModel = require("../../../models/Treasure");

const response = require("../../../configs/response");

module.exports = {
  hero: async (req, res) => {
    try {
      const travelers = await BookingModel.find();
      const treasures = await TreasureModel.find();
      const cities = await VacationModel.find();

      const data = {
        status: true,
        message: "Data succesfully retrieved",
        results: {
          travelers: travelers.length,
          treasures: treasures.length,
          cities: cities.length,
        },
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

  testimony: async (req, res) => {
    try {
      let testimony = [
        {
          _id: "asd1293uasdads1",
          imageUrl: "images/testimony/testimonial-landingpages.png",
          name: "Happy Family",
          rate: 4.55,
          content:
            "What a great trip with my family and I should try again next time soon ...",
          familyName: "Angga",
          familyOccupation: "Product Designer",
        },
        {
          _id: "asd1293uasdads1",
          imageUrl: "images/testimony/testimonial-detailspage.png",
          name: "Happy Family",
          rate: 4.25,
          content:
            "What a great trip with my family and I should try again and again next time soon...",
          familyName: "Angga",
          familyOccupation: "UI Designer",
        },
      ];

      const data = {
        status: true,
        message: "Data succesfully retrieved",
        results: testimony[Math.round(Math.random())],
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
