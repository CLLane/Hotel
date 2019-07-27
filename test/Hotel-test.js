import chai from 'chai';
import fakeData from '../src/data.js'
import Hotel from '../src/Hotel';
const expect = chai.expect;


var hotel;

beforeEach(() => {
  hotel = new Hotel(fakeData[0], fakeData[1], fakeData[2], fakeData[3])
});

describe('Hotel', () => {
  it('Should be a function', () => {
    expect(Hotel).to.be.a('function')
  });
  
  it('Should be able to take in data', () => {
    expect(hotel.customerData.length).to.eql(20);
    expect(hotel.roomData.length).to.eql(20);
    expect(hotel.bookingData.length).to.eql(20);
    expect(hotel.roomServiceData.length).to.eql(20)
  })

  it.skip('Should be able to find todays date', () => {
   
    let today = hotel.getTodaysDate()

    expect(today).to.eql('2019/07/25')
  });

  it('Should be able to find the total rooms available for a specific date', () => {

    let availableRooms = hotel.findTotalRoomsAvailable();

    expect(availableRooms).to.equal(19)
  });

  it.skip('Should be able to calculate total revenue from rooms for the current day for the current day', () => {
    let totalRevenue = hotel.findTotalRevenueFromRooms();
    expect(totalRevenue).to.equal(356.33)
  });

  it('Should be able to calculate the percentage of rooms filled for the current day', () => {

    let percentRoomsFilled = hotel.findPercentRoomsFilled();

    expect(percentRoomsFilled).to.equal(5.0)
  });
  
  it('Should be able to find a customers info from a search', () => {
    
    let customerObj1 = hotel.findCustomerObject('Matilde Larson');
    let customerObj2 = hotel.findCustomerObject('Greg Gregory');
    let customerObj3 = hotel.findCustomerObject('@#$%@2dadkl!')

    expect(typeof customerObj1).to.equal('object')
    expect(customerObj1.customerObj.id).to.eql(1);
    expect(customerObj1.customerObj.name).to.eql('Matilde Larson');
    expect(customerObj2).to.eql('Greg Gregory does not exist, would you like to add a new customer?')
    expect(customerObj3).to.eql('@#$%@2dadkl! does not exist, would you like to add a new customer?')
  });
  
  it('Should be able to find all the orders for the current day', () => {
    let ordersTotal = hotel.findAllOrdersForDate();
    expect(ordersTotal.length).to.eql(2)
    expect(ordersTotal[0].food).to.eql('Rustic Concrete Sandwich')
  });
  
  it.only('Should be able to find the total revenue from roomservice for today', () => {
    let totalRevenue = hotel.totalRevenueForToday();
    expect(totalRevenue).to.eql(371.74);
  })

});