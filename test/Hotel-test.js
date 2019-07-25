import chai from 'chai';
const expect = chai.expect;

import Hotel from '../src/Hotel';

var hotel;

beforeEach(() => {
  hotel = new Hotel()
});

describe('Main', () => {
  it('Should be a function', () => {
    expect(Hotel).to.be.a('function')
  });
});