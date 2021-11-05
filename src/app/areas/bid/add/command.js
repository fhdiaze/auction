class Command {
  constructor(auctionId, bidderId, offer){
    this.auctionId = auctionId;
    this.bidderId = bidderId;
    this.offer = offer;
  }
}

export default Command;