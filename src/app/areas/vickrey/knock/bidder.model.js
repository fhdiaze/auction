class Bidder {
  constructor(name) {
    this.name = name;
  }

  equals(other) {
    let resp = false;

    if(typeof(this) === typeof(other)) {
      resp = this.name === other.name;
    }

    return resp;
  }
};

export default Bidder;