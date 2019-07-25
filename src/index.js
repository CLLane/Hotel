// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// import $ from 'jquery';
import './css/base.scss';
import Hotel from './Hotel.js'

const customerAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users');
const roomAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms');
const bookingAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings');
const roomServiceAPIFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices');

let hotel = null;

Promise.all([customerAPIFetch, roomAPIFetch, bookingAPIFetch, roomServiceAPIFetch])
  .then(values => Promise.all(values.map(value => value.json()))).then((data) => hotel = new Hotel(data[0], data[1], data[2], data[3]))
 
  

setTimeout(() => {
  console.log(hotel.customerData);
  console.log(hotel.roomData);
  console.log(hotel.bookingData);
  console.log(hotel.roomServiceData);
  console.log(hotel);
}, 900);
