import auction from "../../app/areas/auction";

const create = req => {
  const command = new auction.create.Command(req.body.auctionName, req.body.lotName, req.body.lotReserve);
  const response = auction.create.handle(command);

  return response;
};

const knock = req => {
  const command = new auction.knock.Command(req.body.auctionId);
  const response = auction.knock.handle(command);

  return response;
}


export default { create, knock };