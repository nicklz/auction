const db = require("../models");
const Auction = db.auctions;
const User = db.users;
const Bid = db.bids;
const Op = db.Sequelize.Op;

// Gather the auction and bid data by ID of auction
exports.get = async (req, res) => {
  const auctionId = parseInt(req.params.id);

  try {
    const auction = await Auction.findOne({ where: { id: auctionId } })
    const bids = await Bid.findAll({ where: { auctionId: auctionId } })
    res.send({ auction: auction, bids: bids });
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving auction."
    });
  }
};

// TODO: I would add real user authentication / security and validation here etc. Right now we just assume the two users play fair

// Bid on the auction
exports.bid = async (req, res) => {
  const auctionId = parseInt(req.params.id);
  const userId = parseInt(req.body.userId);
  const amount = parseInt(req.body.amount);
  const currentDate = new Date();

  try {
    // TODO: this should all be a transaction but to show coding I went with separate queries

    // Get active auction
    const validAuctionCondition = [
      { id: auctionId },
      { endDate: { [Op.gte]: currentDate.getTime() } },
      { startDate: { [Op.lte]: currentDate.getTime() } },
    ];

    const auction = await Auction.findAll({ where: validAuctionCondition })

    if (auction.length) {
      const lastBid = await Bid.findOne({ order: [['createdAt', 'DESC']] })

      // If no one has bid, or if the user beat the last amount (and wasn't betting against themselves) then lets enter the bid
      if (lastBid === null || (lastBid.amount < amount && lastBid.userId !== userId)) {
        const bid = {
          userId: userId,
          auctionId: auctionId,
          amount: amount
        }
        data = await Bid.create(bid)
        res.send(data);
      }
      else {
        console.log('Invalid bid!')
        res.send({ error: 'Invalid bid!' });
      }
    }
    else {
      console.log('No auction found!')
      res.send({ error: 'No auction found!' });
    }
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while adding a bid."
    });
  }
};
