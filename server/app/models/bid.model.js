module.exports = (sequelize, Sequelize) => {
  const Bid = sequelize.define("bid", {
    auctionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'auctions',
        key: 'id',
      }
    },
    amount: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      }
    },
  });

  return Bid;
};
