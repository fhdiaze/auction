import { Low, JSONFileSync } from 'lowdb';

const adapter = new JSONFileSync('db.json');
const db = new Low(adapter);
db.read();
db.data ||= {
  auctions: [],
  bidders: [],
  bids: []
};
db.write();

export default db;