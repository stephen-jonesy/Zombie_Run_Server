const { fetchApiEndpoints } = require("../models/endpoints");
const defaultRoute = require("../routes/apiRoute");

exports.getApiEndpoints = (request, response, next) => {
  fetchApiEndpoints()
    .then((endpoints) => {
      response.status(200).send({ endpoints });
    })
    .catch(next);
};
