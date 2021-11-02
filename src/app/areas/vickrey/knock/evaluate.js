import Winner from "./winner.model";
import Bid from "./bid.model";
import Bidder from "./bidder.model";
import Lot from "./lot.model";
import domain from '../../../domain';

/**
 * Find the winner of an auction
 * @param {Lot} lot The item offered at auction
 * @param {Bid} bids bids for an acution
 */
const evaluate = (lot, bids) => {
  if (bids.length == 0) {
    return null;
  }

  const defaultBidder = new Bidder('Bougth-In');
  let winningBid = new Bid(defaultBidder, -1);
  let priceBid = new Bid(defaultBidder, lot.reserve);

  for (const bid of bids) {
    if (domain.lot.isValidBid(bid, lot)) {
      const bids = selectWinner(winningBid, bid);
      winningBid = bids.winner;
      priceBid = selectPrice(lot, winningBid, priceBid, bids.loser);
    }
  }

  if (winningBid.offer > 0) {
    return new Winner(winningBid, priceBid.offer);
  } else {
    return null;
  }
};

/**
 * Determines which bid is the winner
 * @param {Bid} bidOne 
 * @param {Bid} bidTwo 
 * @returns A pair bids: {winner, loser}
 */
const selectWinner = (bidOne, bidTwo) => {
  let bids = null;

  if (bidOne.offer === bidTwo.offer) {
    // Win the oldest bid
    bids = { winner: bidOne, loser: bidTwo };
  } else {
    // Win the highest bid
    bids = bidOne.offer > bidTwo.offer ? { winner: bidOne, loser: bidTwo } : { winner: bidTwo, loser: bidOne };
  };

  return bids;
};

/**
 * Determines which bid is the price
 * @param {Lot} lot The auctioned lot
 * @param {Bid} winningBid The current winning bid
 * @param {Bid} priceBid The current highest bid from non-winner
 * @param {Bid} challenger The bid to be checked
 * @returns The bid that defines the prices (i.e. highest bid from a non-winner)
 */
const selectPrice = (lot, winningBid, priceBid, challenger) => {
  if (domain.lot.isValidBid(challenger, lot)) {
    if (!winningBid.bidder.equals(challenger.bidder)) {
      ({ winner: priceBid, } = selectWinner(priceBid, challenger));
    }
  }

  return priceBid;
};

export default evaluate;