import $ from 'jquery';

let domUpdates = {

  pageLoadHandler(todaysDate, totalRooms, totalRevenue, percentOccupied) {
    $('#current-date__display').text(todaysDate)
    $('#rooms-available__display').text(totalRooms);
    $('#total-revenue__display').text('  $' + totalRevenue)
    $('#percent-occupied__display').text(percentOccupied + '%')
  },

  customerSearchHandler() {
    
  }
};

export default domUpdates;
