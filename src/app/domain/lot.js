/**
 * Checks if a bid is valid for a lot (i.e. highest than reserve)
 * @param {Bid} bid 
 * @param {Lot} lot 
 * @returns true if bid offer is valid for the lot
 */
const isValidBid = (bid, lot) => {
  return bid.offer >= lot.reserve;
};

export default { isValidBid };