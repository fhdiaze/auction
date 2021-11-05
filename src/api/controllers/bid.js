import bid from "../../app/areas/bid";

const add = req => {
  const command = new bid.add.Command(req.body.auctionId, req.body.bidderId, req.body.offer);
  const response = bid.add.handle(command);

  return response;
};


export default { add };