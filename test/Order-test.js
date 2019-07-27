import chai from 'chai';
const expect = chai.expect;

import Order from '../src/Order';
import Hotel from '../src/Hotel';
import fakeData from '../src/data';

var order1, order2, hotel;

beforeEach(() => {
  hotel = new Hotel(fakeData[0], fakeData[1], fakeData[2], fakeData[3])
  order1 = new Order(hotel.roomServiceData, hotel.getTodaysDate())
  order2 = new Order(hotel.roomServiceData, '2019/08/11')
});

describe('Order', () => {
  it('Should be a function', () => {
    expect(Order).to.be.a('function')
  });

});