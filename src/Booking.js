
class Booking {
  constructor(roomData, bookingData, customerData) {
    this.roomData = roomData;
    this.bookingData = bookingData;
    this.customerData = customerData
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

  createNewBooking(customerName, roomNumber, date) {

    let findRoom = this.findAllOpenRooms(date).findIndex(room => {
      return room.number === roomNumber
    })

    let foundRoom = this.findAllOpenRooms(date).slice(x, x + 1)

    
    
    let newBooking = {
      id: this.customerData.length + 1,
      date,
      roomNumber
    }

    let newUser = {
      id: this.customerData.length + 1,
      name: customerName
    }

    return [newBooking, newUser, foundRoom];
  }
}

export default Booking;