import chai from 'chai';
const expect = chai.expect;

import Booking from '../src/Booking';
import fakeData from '../src/data'
import Hotel from '../src/Hotel'



let booking, hotel;

beforeEach(() => {
  hotel = new Hotel(fakeData[0], fakeData[1], fakeData[2], fakeData[3])
  booking = new Booking(hotel.roomData, hotel.bookingData)
});

describe('Booking', () => {
  it('Should be a function', () => {
    expect(Booking).to.be.a('function')
  });

  it('should be able to find all rooms that are empty', () => {
    let datesBookings = booking.findAllBookings("2019/10/29");
    expect(datesBookings.length).to.eql(2);
    expect(datesBookings[0].date).to.eql("2019/10/29")
  })

  it('should be able to find all the available rooms for a date', () => {
   let openRooms = booking.findAllOpenRooms("2019/10/29")
    expect(openRooms.length).to.eql(19)
  })

  it.only('should be able to filter available rooms by a room type', () => {
    let suites = booking.filterOpenRoomsByAttribute("2019/10/29", 'roomType', 'suite');

    let kings = booking.filterOpenRoomsByAttribute("2019/10/29", 'bedSize', 'king')

    let bidet = booking.filterOpenRoomsByAttribute("2019/10/29", 'bidet', true)

    let numberBeds = booking.filterOpenRoomsByAttribute("2019/10/29", 'numBeds', 2)

    expect(suites.length).to.eql(5);
    expect(kings.length).to.eql(6);
    expect(bidet.length).to.eql(6);
    expect(numberBeds.length).to.eql(6);
  })
});