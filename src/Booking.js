class Booking {
  constructor(roomData, bookingData) {
    this.roomData = roomData;
    this.bookingData = bookingData;
  }

  findAllBookings(date) {
    return this.bookingData.reduce((acc, booking) => {
      if (booking.date === date) {
        acc.push(booking);
      }
      return acc
    }, []);
  }

  findAllOpenRooms(date) {
    let bookedRooms = this.findAllBookings(date).map(booking => booking.roomNumber);
   
    return this.roomData.filter(function (room) {
      return !bookedRooms.includes(room.number);
    })
  }

  filterOpenRoomsByAttribute(date, attribute, query) {
    let openRooms = this.findAllOpenRooms(date);

    return openRooms.filter(room => {
      return room[attribute] === query
    })
  } 

  filterSelectionByAttribute(attribute, query, array) {
    
    return array.filter(room => {
      return room[attribute] === query
    })
  } 

}

export default Booking;