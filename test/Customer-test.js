import chai from 'chai';
const expect = chai.expect;

import fakeData from '../src/data.js'
import Customer from '../src/Customer';
import Hotel from '../src/Hotel';

var customer, hotel;

beforeEach(() => {
  hotel = new Hotel(fakeData[0], fakeData[1], fakeData[2], fakeData[3])
  customer = hotel.findCustomerObject('Matilde Larson');
});

describe('Customer', () => {
  it('Should be a function', () => {
    expect(Customer).to.be.a('function')
  });

  it('Should be able to find the entire booking history of a customer', () => {
    let customerBookings = customer.findCustomerTotalBookings();
    expect(customerBookings.length).to.eql(1)
    expect(customerBookings[0].userID).to.eql(1)
    expect(customerBookings[0].roomNumber).to.eql(9)
  });

  it('Should be able to find the entire order history of a customer', () => {
    let customerOrders = customer.findCustomerTotalOrders();
    expect(customerOrders.length).to.eql(1)
    expect(customerOrders[0].userID).to.eql(1)
    expect(customerOrders[0].food).to.eql('Tasty Granite Sandwich')
    expect(customerOrders[0].totalCost).to.eql(18.73)
  })

  it('Should be able to find the current room for a customer', () => {
    let customerCurrentRoom = customer.findCustomerCurrentRoom('2019/10/18');
    let customerNotHere = customer.findCustomerCurrentRoom('2019/09/18')
    
    expect(typeof customerCurrentRoom).to.eql('object');
    expect(customerCurrentRoom.number).to.eql(9);
    expect(customerCurrentRoom.roomType).to.eql('residential suite');
    expect(customerNotHere).to.eql('Matilde Larson is not currently staying with us.')
  })
});