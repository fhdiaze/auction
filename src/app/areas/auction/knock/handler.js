import infra from "../../../../infra";
import evaluate from "./evaluate";

const handle = command => {
  const auction = infra.data.db.data.auctions.find(a => a.name === command.auctionId);
  const bids = infra.data.db.data.bids.filter(b => b.auction.name === auction.name);
  const winner = evaluate(auction.lot, bids);

  return winner;
};

export default handle;