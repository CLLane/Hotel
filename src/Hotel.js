import Customer from './Customer'

class Hotel {
  constructor(customerData, roomData, bookingData, roomServiceData) {
    this.customerData = customerData.users;
    this.roomData = roomData.rooms;
    this.bookingData = bookingData.bookings;
    this.roomServiceData = roomServiceData.roomServices;
    this.newOrder = {}
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

  findAllOrdersForDate(date) {
    return this.roomServiceData.filter(order => {
      return order.date === date
    })
  }

  findTotalRoomsAvailable (date) {
    let bookedRooms = this.bookingData.reduce((acc, booking) => {
      if (booking.date === date) {
        acc++;
      }
      return acc
    }, 0);
    return 50 - bookedRooms
  }

  findTotalRevenueFromOrders(date) {
    let ordersForToday = this.findAllOrdersForDate(date);
    return ordersForToday.reduce((acc, order) => {
      acc += order.totalCost
      return acc
    }, 0)
  }

  findTotalRevenueFromRooms(date) {
    return this.roomData.reduce((acc, room) => {
      this.bookingData.forEach(booking => {
        if (booking.date === date && 
        booking.roomNumber === room.number) {
          acc += room.costPerNight
        }
      })
      return acc
    }, 0)
  }

  totalRevenueForToday(date) {
    return (this.findTotalRevenueFromOrders(date) + this.findTotalRevenueFromRooms(date)).toFixed(2)
  }

  findPercentRoomsFilled(date) {
    let roomsAvailable = this.findTotalRoomsAvailable(date);
    let totalRooms = this.roomData.length;
    let percentRoomsEmpty = roomsAvailable / totalRooms;
    let percentRoomsFilled = (percentRoomsEmpty - 1) * -100;

    return eval(percentRoomsFilled.toFixed(1))
  }

  findCustomerObject(customerQuery) {
    let formattedQuery = customerQuery.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/' '0123456789]/gi, '').toLowerCase();
    let customerObject = this.customerData.filter(customer => {
      let formattedCustomer = customer.name.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\/' '0123456789]/gi, '').toLowerCase();
      return formattedCustomer === formattedQuery;
    })[0];
    return customerObject !== undefined ? new Customer(customerObject, this.roomData, this.bookingData, this.roomServiceData) : `${customerQuery} does not exist, would you like to add a new customer?`;
  }
}

export default Hotel;