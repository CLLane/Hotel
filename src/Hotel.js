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
    return [year, month, day].join('/')
  }
}
export default Hotel;