import chai from 'chai';
const expect = chai.expect;

import Order from '../src/Order';

var order;

beforeEach(() => {
  order = new Order()
});

describe('Order', () => {
  it('Should be a function', () => {
    expect(Order).to.be.a('function')
  });
});