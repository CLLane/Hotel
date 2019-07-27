import Order from './Order'

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

  findCustomerDailyOrders(date) {
    let dailyOrders = this.findCustomerTotalOrders()
    return dailyOrders.filter(order => {
      if (order.date === date) {
        return order
      }
    })
  }

  calculateCustomerTotalOrderBill() {
    let customerOrders = this.findCustomerTotalOrders();
    return customerOrders.reduce((acc, order) => {
      if (order.totalCost !== undefined) {
        acc += order.totalCost
      }
      return acc
    }, 0)
  }

  calculateCustomerDailyOrderBill(date) {
    console.log('date :', date);
    let customerOrders = this.findCustomerTotalOrders();
    return customerOrders.reduce((acc, order) => {
      if (order.date === date) {
        acc += order.totalCost
      }
      return acc
    }, 0)
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
  calculateBookingTotalBill() {
    let allBookings = this.findCustomerTotalBookings()
    return allBookings.reduce((acc, booking) => {
      this.roomData.forEach(room => {
        if (room.number === booking.roomNumber) {
          acc += room.costPerNight
        }
      })
      return acc
    }, 0).toFixed(2)
  }

  calculateCustomerTotalBill() {
    let roomServiceBill = this.calculateCustomerTotalOrderBill();
    let roomTotal = this.calculateBookingTotalBill();
    return eval(roomTotal) + roomServiceBill
  }

  calculateCustomerDailyBill(date) {
    let roomServiceBill = this.findCustomerDailyOrders(date)
    let currentRoom = this.findCustomerCurrentRoom(date)
    return currentRoom.costPerNight + roomServiceBill
  }

  createNewOrder() {
    this.newOrder = new Order(this.roomServiceData, this.customer)
    return this.newOrder
  } 
}

export default Customer;