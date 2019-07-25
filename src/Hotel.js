class Hotel {
  constructor(customerData, roomData, bookingData, roomServiceData) {
    this.customerData = customerData.users;
    this.roomData = roomData.rooms;
    this.bookingData = bookingData.bookings;
    this.roomServiceData = roomServiceData.roomServices;
  }
}

export default Hotel;