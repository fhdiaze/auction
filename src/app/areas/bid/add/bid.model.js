class Bid {
  /**
   * Offer to pay for a lot
   * @param {*} bidder The buyer
   * @param {*} offer The price offered
   */
  constructor(auction, bidder, offer){
    this.auction = auction;
    this.bidder = bidder;
    this.offer = offer;
  }
}

export default Bid;