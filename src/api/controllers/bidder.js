import bidder from "../../app/areas/bidder";

const create = req => {
  const command = new bidder.create.Command(req.body.name);
  const response = bidder.create.handle(command);

  return response;
};


export default { create };