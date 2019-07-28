// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
// import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
// import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel.js';
import Customer from './Customer.js'
import domUpdates from './domUpdates.js';

const customerAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users');
const roomAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms');
const bookingAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings');
const roomServiceAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices');

let hotel = null;
let customer = null;

Promise.all([customerAPIFetch, roomAPIFetch, bookingAPIFetch, roomServiceAPIFetch])
  .then(values => Promise.all(values.map(value => value.json()))).then((data) => hotel = new Hotel(data[0], data[1], data[2], data[3]))
 
  
setTimeout(() => {
  let todaysDate = hotel.getTodaysDate();
  let totalRoomsAvailable = hotel.findTotalRoomsAvailable();
  let totalRevenue = hotel.totalRevenueForToday();
  let percentOccupied = hotel.findPercentRoomsFilled();
  domUpdates.pageLoadHandler(todaysDate, totalRoomsAvailable, totalRevenue, percentOccupied)
}, 900);

$('#customer-input__input').keypress((e) => {
  let key = e.which;
  if (key === 13) {
    let customerQuery = $('#customer-input__input').val();
    customer = hotel.findCustomerObject(customerQuery);
    let customerName = customer.customerName;
    let customerId = customer.customerObj.id;

    let customerBookings = customer.findCustomerTotalBookings();

    let customerCurrentBooking = customer.findCustomerCurrentRoom(hotel.getTodaysDate());
    let customerTotalBookingBill = customer.calculateBookingTotalBill()
    let customerCurrentBookingBill = customerCurrentBooking.costPerNight

    let customerOrders = customer.findCustomerTotalOrders();
    let customerDailyOrders = customer.findCustomerDailyOrders(hotel.getTodaysDate());
    let customerOrderBill = customer.calculateCustomerTotalOrderBill();
    let customerDailyOrderBill = customer.calculateCustomerDailyOrderBill(hotel.getTodaysDate());


    let customerTotalBill = customer.calculateCustomerTotalBill()
    let customerDailyBill = customer.calculateCustomerDailyBill(hotel.getTodaysDate())
    
    let customerInfo = {
      name: customerName,
      id: customerId,
      date: hotel.getTodaysDate(),
      booking: {
        total: customerBookings,
        totalBill: customerTotalBookingBill,
        daily: customerCurrentBooking,
        dailyBill: customerCurrentBookingBill
      },
      order: {
        total: customerOrders,
        totalBill: customerOrderBill,
        daily: customerDailyOrders,
        dailyTotal: customerDailyOrderBill
      },
      bill: {
        total: customerTotalBill,
        daily: customerDailyBill
      }
    }
console.log('customerInfo :', customerInfo);
    domUpdates.customerSearchHandler(customerInfo)
  }
})