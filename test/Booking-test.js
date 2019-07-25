import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/Booking';



let booking;

beforeEach(() => {
  booking = new Booking()
});

describe('Booking', () => {
  it('Should be a function', () => {
    expect(Booking).to.be.a('function')
  });
});