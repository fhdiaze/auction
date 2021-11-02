import { expect } from '@jest/globals';
import knock from '../../../../src/app/areas/vickrey/knock';

test('Auction with no bids', () => {
  // Arrange
  const lot = new knock.Lot('bike', 300);
  const bids = [];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).toBeNull();
});

test('Auction with one bid lower than reserve', () => {
  // Arrange
  const lot = new knock.Lot('bike', 300);
  const bidder = new knock.Bidder('Carlos');
  const offer = 299;
  const bids = [
    new knock.Bid(bidder, offer)
  ];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).toBeNull();
});

test('Auction with a bidder with two bids lower than reserve', () => {
  // Arrange
  const reserve = 300;
  const lot = new knock.Lot('bike', reserve);
  const bidder = new knock.Bidder('Carlos');
  const bidOne = new knock.Bid(bidder, 290);
  const bidTwo = new knock.Bid(bidder, 299);
  const bids = [
    bidOne,
    bidTwo
  ];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).toBeNull();
});

test('Auction with one bid higher than reserve', () => {
  // Arrange
  const reserve = 300;
  const lot = new knock.Lot('bike', reserve);
  const bidder = new knock.Bidder('Carlos');
  const offer = 301;
  const bids = [
    new knock.Bid(bidder, offer)
  ];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).not.toBeNull();
  expect(winner.price).toBe(reserve);
});

test('Auction with a bidder with two bids higher than reserve', () => {
  // Arrange
  const reserve = 300;
  const lot = new knock.Lot('bike', reserve);
  const bidder = new knock.Bidder('Carlos');
  const bidOne = new knock.Bid(bidder, 301);
  const bidTwo = new knock.Bid(bidder, 302);
  const bids = [
    bidOne,
    bidTwo
  ];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).not.toBeNull();
  expect(winner.bid.offer).toBe(bidTwo.offer);
  expect(winner.price).toBe(reserve);
});

test('Auction with two bids, one higher and other lower than reserve from two bidders', () => {
  // Arrange
  const reserve = 300;
  const lot = new knock.Lot('bike', reserve);
  const bidderOne = new knock.Bidder('Carlos');
  const bidderTwo = new knock.Bidder('Juan');
  const bidOne = new knock.Bid(bidderOne, 299)
  const bidTwo = new knock.Bid(bidderTwo, 302);
  const bids = [
    bidOne,
    bidTwo
  ];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).not.toBeNull();
  expect(winner.price).toBe(lot.reserve);
  expect(winner.bid.bidder.name).toBe(bidTwo.bidder.name);
});

test('Auction with two bids higher than reserve from two bidders', () => {
  // Arrange
  const reserve = 300;
  const lot = new knock.Lot('bike', reserve);
  const bidderOne = new knock.Bidder('Carlos');
  const bidderTwo = new knock.Bidder('Juan');
  const bidOne = new knock.Bid(bidderOne, 301)
  const bidTwo = new knock.Bid(bidderTwo, 302);
  const bids = [
    bidOne,
    bidTwo
  ];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).not.toBeNull();
  expect(winner.price).toBe(bidOne.offer);
  expect(winner.bid.bidder.name).toBe(bidTwo.bidder.name);
});

// Test when the second bid is temporally from the same bidder than the highest
test('Auction with two bids higher than reserve from two bidders', () => {
  // Arrange
  const reserve = 300;
  const lot = new knock.Lot('bike', reserve);
  const bidderOne = new knock.Bidder('Carlos');
  const bidderTwo = new knock.Bidder('Juan');
  const bidOne = new knock.Bid(bidderOne, 301)
  const bidTwo = new knock.Bid(bidderTwo, 302);
  const bids = [
    bidOne,
    bidTwo
  ];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).not.toBeNull();
  expect(winner.price).toBe(bidOne.offer);
  expect(winner.bid.bidder.name).toBe(bidTwo.bidder.name);
});