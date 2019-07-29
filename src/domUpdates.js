import $ from 'jquery';

let domUpdates = {

  pageLoadHandler(todaysDate, totalRooms, totalRevenue, percentOccupied) {
    $('#current-date__display').text(todaysDate)
    $('#rooms-available__display').text(totalRooms);
    $('#total-revenue__display').text('  $' + totalRevenue)
    $('#percent-occupied__display').text(percentOccupied + '%')
    $('.available-room__result').hide()
  },

  customerSearchHandler(customerInfo) {
    $('#customer-input__input').val('');
    $('#current-date__bill').text(customerInfo.date);
    $('#current-booking__bill').text(customerInfo.bill.daily);
    $('#current-order__bill').text(customerInfo.order.dailyTotal);
    $('#total-daily__bill').text(customerInfo.bill.daily);

    $('#lifetime-booking__bill').text(customerInfo.booking.totalBill);
    $('#lifetime-order__bill').text(customerInfo.order.totalBill);
    $('#lifetime-total__bill').text(customerInfo.bill.total)

    $('#past-booking__display').text(customerInfo.booking.total.forEach((booking, i) => {
      if (i <= 9) {
        $("#past-booking__display1").append(`<div class="past-booking" >
        <p>Date: ${booking.date} Room: ${booking.roomNumber}</p>
        </div>`)
      }
      if (i > 9 && i <= 19) {
        $("#past-booking__display2").append(`<div class="past-booking">
        <p>Date: ${booking.date}</p> 
        <p>Room: ${booking.roomNumber}</p>
        </div>`)
      }
      if (i > 18) {
        return
      }
    }))
    
    $('#customer-name__display').text(customerInfo.name)
    $('#customer-id__display').text(`Customer Id: ${customerInfo.id}`)
    $('#current-room-type__display').text(customerInfo.booking.daily.roomType);
    $('#current-room-number__display').text(customerInfo.booking.daily.number);
    $('#current-bed-size__display').text(customerInfo.booking.daily.bedSize);
    $('#current-bed-count__display').text(customerInfo.booking.daily.numBeds);
    $('#current-bidet-status__display').text(customerInfo.booking.daily.bidet);
    $('#current-room-cost__display').text(customerInfo.booking.daily.costPerNight)

    $('.order-history__display').text(customerInfo.order.total.forEach((order, i) => {
      if (i <= 9) {
        $("#past-order__display").append(`
        <div class="past-order" >
          <p>
            Date: ${order.date} <br>
            Food: ${order.food} <br>
            Cost: ${order.totalCost} <br>
          </p>
        </div>`)
      }
    }))
  },

  availableRoomsSearchResult(filteredArray) {
    $('.available-room__search').hide()
    $('.available-room__result').show()

    if (filteredArray.length < 1) {
      return 'We do not have any rooms that match those requirements'
    }
    $('.available-room__result').text(filteredArray.forEach(room => {
      $(".available-room__result").append(`
          <div class="past-order" >
            <p>
              number: ${room.number}
              Type: ${room.roomType}
              bidet: ${room.bidet}
              bedSize: ${room.bedSize}
              numBeds: ${room.numBeds}
              costPerNight: ${room.costPerNight}
            </p>
           </div>`)
    }))
    
  }
};

export default domUpdates;
