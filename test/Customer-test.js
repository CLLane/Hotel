import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer';

var customer;

beforeEach(() => {
  customer = new Customer()
});

describe('Customer', () => {
  it('Should be a function', () => {
    expect(Customer).to.be.a('function')
  });
});