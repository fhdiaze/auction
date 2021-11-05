import infra from "../../../../infra";
import Bid from "./bid.model";
import Command from "./command";

/**
 * Handle a command to add a bid for an auction and bidder
 * @param {Command} command The add command
 */
const handle = command => {
  const auction = infra.data.db.data.auctions.find(a => a.name === command.auctionId);
  const bidder = infra.data.db.data.bidders.find(b => b.name === command.bidderId);
  const bid = new Bid(auction, bidder, command.offer);
  infra.data.db.data.bids.push(bid);
  infra.data.db.write();

  return bid;
};

export default handle;