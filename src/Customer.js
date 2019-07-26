
class Customer {
  constructor(customerObj, roomData, bookingData, roomServiceData) {
    this.roomData = roomData
    this.bookingData = bookingData
    this.roomServiceData = roomServiceData;
    this.customerObj = customerObj;
    this.customerName = customerObj.name;
    this.customerId = customerObj.id;
  }

  findCustomerTotalBookings() {
    return this.bookingData.filter(booking => {
      if (booking.userID === this.customerId) {
        return booking
      }
    });
  }

  findCustomerTotalOrders() {
    return this.roomServiceData.filter(order => {
      if (order.userID === this.customerId) {
        return order
      }
    });
  }
  
  findCustomerCurrentRoom(date) {
    let currentBooking = this.findCustomerTotalBookings().find(booking => {
      return booking.date === `${date}`
    });
    if (currentBooking !== undefined) {
      return this.roomData.reduce((acc, room) => {
        if (currentBooking.roomNumber === room.number) {
          acc = room
        }
        return acc
      }, {})
    } else {
      return `${this.customerName} is not currently staying with us.`
    }
  }
}

export default Customer;