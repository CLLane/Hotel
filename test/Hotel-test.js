import chai from 'chai';
import fakeData from '../src/data.js'
const expect = chai.expect;

import Hotel from '../src/Hotel';

var hotel;

beforeEach(() => {
  hotel = new Hotel(fakeData.users, fakeData.rooms, fakeData.bookings, fakeData.roomServices)
});

describe('Main', () => {
  it('Should be a function', () => {
    expect(Hotel).to.be.a('function')
  });

  it('Should be able to find todays date', () => {
   
    let today = hotel.getTodaysDate()

    expect(today).to.eql('2019/07/25')
  });
});