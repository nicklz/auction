module.exports = app => {
  const system = require("../controllers/system.controller.js");

  var router = require("express").Router();

  router.get("/sync", system.sync);
  router.get("/seed", system.seed);

  app.use('/api/system', router);
};
