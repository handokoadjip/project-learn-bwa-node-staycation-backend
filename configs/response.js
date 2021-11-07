"use-strict";

const response = (status = 200, data, res) => {
  let response = {
    meta: {
      code: status,
      status: data.status,
      message: data.message,
    },
    data: data.results,
  };

  res.status(status).json(response);
};

module.exports = response;
