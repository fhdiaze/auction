import Bidder from "./bidder.model";
import Command from "./command";
import infra from "../../../../infra";

/**
 * Handle a create-bidder command
 * @param {Command} command The command
 */
const handle = command => {
  const bidder = new Bidder(command.name);
  infra.data.db.data.bidders.push(bidder);
  infra.data.db.write();

  return bidder;
};

export default handle;