class Hotel {
  constructor(customerData, roomData, bookingData, roomServiceData) {
    this.customerData = customerData.users;
    this.roomData = roomData.rooms;
    this.bookingData = bookingData.bookings;
    this.roomServiceData = roomServiceData.roomServices;
  }

  getTodaysDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = '' + (today.getMonth() + 1);
    let day = '' + today.getDate();
    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }
    return [year, month, day].join('/');
  }

  findTotalRoomsAvailable () {
    return this.bookingData.reduce((acc, booking) => {
      if (booking.date !== this.getTodaysDate()) {
        acc++;
      }
      return acc
    }, 0);
  }

  findTotalRevenueFromRooms() {
    return this.roomData.reduce((acc, room) => {
      this.bookingData.forEach(booking => {
        if (booking.date === this.getTodaysDate() && 
        booking.roomNumber === room.number) {
          acc += room.costPerNight
        }
      })
      return acc
    }, 0)
  }

  findPercentRoomsFilled() {
    let roomsAvailable = this.findTotalRoomsAvailable();
    let totalRooms = this.roomData.length;
    let percentRoomsEmpty = roomsAvailable / totalRooms;
    let percentRoomsFilled = (percentRoomsEmpty - 1) * -100;

    return eval(percentRoomsFilled.toFixed(1))
  }

  findCustomerObject(customerQuery) {
    let formattedQuery = customerQuery.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/' ']/gi, '').toLowerCase();
    
    let customerObject = this.customerData.filter(customer => {
      let formattedCustomer = customer.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/' ']/gi, '').toLowerCase();
      return formattedCustomer === formattedQuery;
    })[0];

    return customerObject !== undefined ? customerObject : `${customerQuery} does not exist, would you like to add a new customer?`;
  }

}

export default Hotel;