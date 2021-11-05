import Lot from "./lot.model";
import Auction from "./auction.model";
import Command from "./command";
import infra from "../../../../infra";

/**
 * Handle a create auction command
 * @param {Command} command The create command
 */
const handle = command => {
  const existentAuction = infra.data.db.data.auctions.find(a => a.name === command.auctionName);

  if (existentAuction) {
    throw new infra.errors.AppError(
      infra.errors.ErrorType.Conflict,
      'Exists another resource with the same id',
      `There is already an action with the name: ${command.auctionName}`,
      true
    );
  }
  const lot = new Lot(command.lotName, command.lotReserve);
  const auction = new Auction(command.auctionName, lot);

  infra.data.db.data.auctions.push(auction);
  infra.data.db.write();

  return auction;
};

export default handle;