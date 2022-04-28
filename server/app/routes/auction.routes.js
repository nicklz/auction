module.exports = app => {
  const auctions = require("../controllers/auction.controller.js");

  var router = require("express").Router();

  // Retrieve all auctions
  router.get("/:id/get", auctions.get);



  router.post("/:id/bid", auctions.bid);



  app.use('/api/auctions', router);
};
