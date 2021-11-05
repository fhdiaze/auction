import { expect } from '@jest/globals';
import knock from '../../../../src/app/areas/auction/knock';

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

test('Auction with five bidders with highest and second-highest bid from same bidder', () => {
  // Arrange
  const reserve = 100;
  const lot = new knock.Lot('Mug', reserve);
  const bidderA = new knock.Bidder('A');
  const bidderC = new knock.Bidder('C');
  const bidderD = new knock.Bidder('D');
  const bidderE = new knock.Bidder('E');
  const bidAOne = new knock.Bid(bidderA, 110);
  const bidATwo = new knock.Bid(bidderA, 130);
  const bidCOne = new knock.Bid(bidderC, 125);
  const bidDOne = new knock.Bid(bidderD, 105);
  const bidDTwo = new knock.Bid(bidderD, 115);
  const bidDThree = new knock.Bid(bidderD, 90);
  const bidEOne = new knock.Bid(bidderE, 132);
  const bidETwo = new knock.Bid(bidderE, 135);
  const bidEThree = new knock.Bid(bidderE, 140);
  const bids = [
    bidAOne,
    bidATwo,
    bidCOne,
    bidDOne,
    bidDTwo,
    bidDThree,
    bidEOne,
    bidETwo,
    bidEThree
  ];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).not.toBeNull();
  expect(winner.price).toBe(bidATwo.offer);
  expect(winner.bid.bidder.name).toBe(bidEThree.bidder.name);
});

test('Auction with two bidders with highest bid firs than price bid', () => {
  // Arrange
  const reserve = 100;
  const lot = new knock.Lot('Mug', reserve);
  const bidderA = new knock.Bidder('A');
  const bidderC = new knock.Bidder('C');
  const bidAOne = new knock.Bid(bidderA, 110);
  const bidATwo = new knock.Bid(bidderA, 130);
  const bidCOne = new knock.Bid(bidderC, 125);
  const bids = [
    bidAOne,
    bidATwo,
    bidCOne
  ];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).not.toBeNull();
  expect(winner.price).toBe(bidCOne.offer);
  expect(winner.bid.bidder.name).toBe(bidATwo.bidder.name);
});

test('Auction with update of price bid from the same bidder that highest bid', () => {
  // Arrange
  const reserve = 100;
  const lot = new knock.Lot('Mug', reserve);
  const bidderA = new knock.Bidder('A');
  const bidderC = new knock.Bidder('C');
  const bidderD = new knock.Bidder('D');
  const bidderE = new knock.Bidder('E');
  const bidAOne = new knock.Bid(bidderA, 110);
  const bidATwo = new knock.Bid(bidderA, 130);
  const bidCOne = new knock.Bid(bidderC, 125);
  const bidDOne = new knock.Bid(bidderD, 105);
  const bidDTwo = new knock.Bid(bidderD, 115);
  const bidDThree = new knock.Bid(bidderD, 90);
  const bidEOne = new knock.Bid(bidderE, 129);
  const bidETwo = new knock.Bid(bidderE, 135);
  const bidEThree = new knock.Bid(bidderE, 140);
  const bids = [
    bidAOne,
    bidATwo,
    bidCOne,
    bidDOne,
    bidDTwo,
    bidDThree,
    bidEOne,
    bidETwo,
    bidEThree
  ];

  // Act
  const winner = knock.evaluate(lot, bids);

  // Assert
  expect(winner).not.toBeNull();
  expect(winner.price).toBe(bidATwo.offer);
  expect(winner.bid.bidder.name).toBe(bidEThree.bidder.name);
});