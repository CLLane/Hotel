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
    console.log(customerInfo)
    $('#customer-input__input').val('');
    $('#current-date__bill').text(customerInfo.date);
    $('#current-booking__bill').text(customerInfo.bill.daily);
    $('#current-order__bill').text(customerInfo.order.dailyTotal);
    $('#total-daily__bill').text(customerInfo.bill.daily);

    $('#lifetime-booking__bill').text(customerInfo.booking.totalBill);
    $('#lifetime-order__bill').text(customerInfo.order.totalBill);
    $('#lifetime-total__bill').text(customerInfo.bill.total)

    $('.past-order__container').text(
      customerInfo.order.total.forEach(order => {
        $("#past-order__display").append(`<div class="past-order" >
        <p>Date: ${order.date}</p>
        <p>Order: ${order.food}</p>
        <p>Cost: ${order.totalCost}</p>
        </div>`)
      }));


    $('.past-booking__container').text(customerInfo.booking.total.forEach((booking, i) => {
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

  },

  availableRoomsSearchResult(filteredArray) {
    $('.available-room__search').hide()
    $('.available-room__result').show()
    $('input[name="room-type"').prop('checked', false)
    $('input[name="bed-type"').prop('checked', false)
    $('input[name="number-beds"').prop('checked', false)
    $('input[name="bidet-status"').prop('checked', false)

    if (filteredArray.length < 1) {
      $(".available-room__result").append(`
        <div class="room-available" >
         <p>'We do not have any rooms that match those requirements'</p>
        </div>`)

      $('.available-room__result').append(`<button type="button" id="reset-search__button">Reset Search</button>`)

      $('#reset-search__button').click(() => {
        $('.available-room__search').show()
        $('.available-room__result').hide()
      })

    } else {
      $('.available-room__result').text(filteredArray.forEach(room => {
        $(".available-room__result").append(`
          <div class="room-available" >
              <p>Room: ${room.number}</p>
              <p>Type: ${room.roomType}</p>
              <p>Bed Size: ${room.bedSize}</p>
              <p>#Beds: ${room.numBeds}</p>
              <p>Bidet: ${room.bidet}</p>
              <p>Cost/Night: ${room.costPerNight}</p>
           </div>`)
      }))
      
      $('.available-room__result').append(`<button type="button" id="reset-search__button">Reset Search</button>`)

      $('#reset-search__button').click(() => {
        $('.available-room__search').show()
        $('.available-room__result').hide()
      })
    }
  },
  
  showHistoryData(selection) {
    if (selection === 'past-order') {
      $('.past-booking__container').hide();
      $('.past-order__container').show();
    } 
    if (selection === 'past-booking') {
      $('.past-order__container').hide();
      $('.past-booking__container').show();
    }
  },

  showCreateSelection(selection) {
    if (selection === 'create-booking') {
      $('#new-booking__container').show();
      $('#new-order__container').hide()
    } 
    if(selection === 'create-order') {
      $('#new-booking__container').hide();
      $('#new-order__container').show()
    }
  },

};

export default domUpdates;
