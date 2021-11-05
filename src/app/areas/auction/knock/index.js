import Lot from "./lot.model";
import Winner from "./winner.model";
import evaluate from './evaluate';
import Bid from './bid.model';
import Bidder from "./bidder.model";
import Command from "./command";
import handle from "./handler";

export default { Command, handle, Lot, Bidder, Bid, Winner, evaluate };