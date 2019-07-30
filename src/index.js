import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel.js';
import Customer from './Customer.js'
import Booking from './Booking.js'
import domUpdates from './domUpdates.js';

const customerAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users');
const roomAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms');
const bookingAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings');
const roomServiceAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices');

let hotel = null;
let customer = null;

Promise.all([customerAPIFetch, roomAPIFetch, bookingAPIFetch, roomServiceAPIFetch])
  .then(values => Promise.all(values.map(value => value.json()))).then((data) => hotel = new Hotel(data[0], data[1], data[2], data[3]))
 

$('.past-order__container').hide();
$('#new-order__container').hide();

setTimeout(() => {
  let todaysDate = hotel.getTodaysDate();
  let totalRoomsAvailable = hotel.findTotalRoomsAvailable(todaysDate);
  let totalRevenue = hotel.totalRevenueForToday(todaysDate);
  let percentOccupied = hotel.findPercentRoomsFilled(todaysDate);
  domUpdates.pageLoadHandler(todaysDate, totalRoomsAvailable, totalRevenue, percentOccupied)
}, 800);

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
    domUpdates.customerSearchHandler(customerInfo)
  }
})

let roomTypeSelection, bedTypeSelection, numberBedSelection, bidetSelectionStatus;

$('#room-type__filter').click((e) => {
  roomTypeSelection = e.target.dataset.type;
})

$('#bed-type__filter').click((e) => { 
  bedTypeSelection = e.target.dataset.type;
})

$('#number-beds__filter').click((e) => {
  numberBedSelection = eval(e.target.dataset.type);
})

$('#bidet-status__filter').click((e) => {
  let string = e.target.dataset.type;
  if (string === 'true') {
    bidetSelectionStatus = true
  } else {
    bidetSelectionStatus = false
  }
})

$('#submit-search__button').click(() => {
  let booking = new Booking(hotel.roomData, hotel.bookingData, hotel.customerData)
 
  let date = $('#submit-date').val();

  let dateFilter = booking.findAllOpenRooms(date)

  let roomTypeFilter = booking.filterSelectionByAttribute('roomType', roomTypeSelection, dateFilter)

  let bedSizeFilter = booking.filterSelectionByAttribute('bedSize', bedTypeSelection, roomTypeFilter)

  let numberBedFilter = booking.filterSelectionByAttribute('numBeds', numberBedSelection, bedSizeFilter)

  let bidetStatusFilter = 
  booking.filterSelectionByAttribute('bidet', bidetSelectionStatus, numberBedFilter)

  domUpdates.availableRoomsSearchResult(bidetStatusFilter)

  $('#reset-search__button').click(() => {
    $('#submit-date').val('')
    $('.room-available').remove()
    $('#reset-search__button').remove()
  })
})

$('#date-input__input').keypress((e) => {
  let key = e.which;
  let date = $('#date-input__input').val()
  let totalRoomsAvailable = hotel.findTotalRoomsAvailable(date);
  let totalRevenue = hotel.totalRevenueForToday(date);
  let percentOccupied = hotel.findPercentRoomsFilled(date);
  if (key === 13) {
    domUpdates.pageLoadHandler( date, totalRoomsAvailable, totalRevenue, percentOccupied)
    $('#date-input__input').val('')
  }

})

$('.history-tab').click((e) => {
  let historySelection = e.target.dataset.type
  domUpdates.showHistoryData(historySelection)
})

$('.create-new-tab').click((e) => {
  let createSelection = e.target.dataset.type
  domUpdates.showCreateSelection(createSelection)
})

$('#new-customer__submit').click(() => {
  let booking = new Booking(hotel.roomData, hotel.bookingData, hotel.customerData)

  let customerName = $('#new-booking__input').val();
  let roomNumber = $('#new-booking__roomnumber').val();
  let bookingDate = $('#new-booking__date').val();

  let newBooking = booking.createNewBooking(customerName, roomNumber, bookingDate)

  hotel.bookingData.push(newBooking[0])
  hotel.customerData.push(newBooking[1])
  

  $('#new-booking__container').text(`You have Created a booking for ${customerName}`)

})
