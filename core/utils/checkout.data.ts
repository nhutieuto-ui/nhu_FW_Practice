import testData from '../source/testData.json';

export interface PaymentMethod {
  methods: string[];
}

export const checkoutData = testData.checkout;

export const paymentMethods: PaymentMethod = {
  methods: [checkoutData.paymentMethod.cod, checkoutData.paymentMethod.card],
};