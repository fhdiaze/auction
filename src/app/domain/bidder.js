/**
 * Determins if two bidders are the same
 * @param {Bidder} one 
 * @param {Bidder} other 
 * @returns true if both bidders are the same
 */
const equals = (one, other) => {
  let resp = false;

  if (typeof (one) === typeof (other)) {
    resp = one.name === other.name;
  }

  return resp;
}

export default { equals };