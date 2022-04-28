const db = require("../models");
const Auction = db.auctions;
const User = db.users;

// TODO: these are just helper endpoints for development / wouldn't be production code

// Sync function for restarting the database
exports.sync = async (req, res) => {
  try {
    await db.sequelize.sync({ force: true })
    res.send({ data: 'Database refreshed' });
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "The database exploded."
    });
  }
};

// Seeds some basic data to start things off
exports.seed = async (req, res) => {
  try {
    let data = {}
    const startDate = new Date()
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 1)

    const auction = {
      name: 'house',
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'http://fpoimg.com/600x400?text=Preview'
    };

    // Create a single auction to bid on
    await Auction.create(auction);
    await User.create({ name: 'bob' });
    await User.create({ name: 'larry' });
    res.send({ data: 'Data re-seeded' });

  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "The database exploded."
    });
  }
};
