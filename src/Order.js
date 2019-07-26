class Order {
  constructor(orderData, date) {
    this.orderData = orderData
    this.date = date
  }

  findAllOrdersForDate() {
    return this.orderData.filter(order => {
      return order.date === this.date
    })
  }
}

export default Order;