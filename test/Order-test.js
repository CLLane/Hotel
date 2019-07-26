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

  it('Should be able to find all the orders for a given date', () => {

    let todaysOrders = order1.findAllOrdersForDate();
    let specificDate = order2.findAllOrdersForDate();

    expect(todaysOrders.length).to.eql(2)
    expect(todaysOrders[0].food).to.eql('Rustic Concrete Sandwich')
    expect(specificDate.length).to.eql(1)
    expect(specificDate[0].food).to.eql('Handcrafted Rubber Sandwich')

  })
});