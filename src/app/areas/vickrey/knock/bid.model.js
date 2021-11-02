class Bid {
  /**
   * Offer to pay for a lot
   * @param {*} bidder The buyer
   * @param {*} offer The price offered
   */
  constructor(bidder, offer){
    this.bidder = bidder;
    this.offer = offer;
  }
}

export default Bid;