import { PaymentDetails, PaymentMethod } from '../../app/payment/PaymentDetails';
import { PaymentService } from '../../app/payment/PaymentService';

describe('Payment Service', () => {
  const paymentAdapterMock = {
    processPayment: jest.fn(),
  };
  let paymentService: PaymentService;

  beforeEach(() => {
    paymentService = new PaymentService(paymentAdapterMock);
  });

  test('should successfully process a valid payment', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const paymentDetails : PaymentDetails ={
      amount: 20,
      currency: 'DT',
      method: PaymentMethod.CreditCard,
      cardNumber: '12548'
    }
    //TODO: Create mockProcessPaymentResponse object containing success status and a fake transactiondId
    const mockProcessPaymentResponse = {
      status: 'success', 
      transactionId: 'txn_1234567890'
    }
    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockImplementation((paymentDetails :PaymentDetails) => mockProcessPaymentResponse)
    // Act
    const result = paymentService.makePayment(paymentDetails);
    // Assert
    // Check the returned result is equal to the success message returned by makePayment with thefake  transactionId you have defined in mockProcessPaymentResponse
    expect(result).toEqual(`Payment successful. Transaction ID: ${mockProcessPaymentResponse.transactionId}`)
    // Check that processPayment inside makePayment has been called with paymentDetails
    expect(paymentAdapterMock.processPayment).toHaveBeenCalledWith(paymentDetails)
  });

  test('should throw an error for payment failure', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data
    const paymentDetails : PaymentDetails ={
      amount: 10,
      currency: 'DT',
      method: PaymentMethod.PayPal,
      cardNumber: '148'
    }
    //TODO: Create mockProcessPaymentResponse object containing failure status
    const mockProcessPaymentResponse= {
      status: 'failure' ,
      transactionId: 'txn_1234567890'
    }
    //TODO: Mock processPayment implementation
    paymentAdapterMock.processPayment.mockImplementation((paymentDetails :PaymentDetails) => mockProcessPaymentResponse)
    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Payment failed');
  });

  test('should throw an error for invalid payment amount', () => {
    // Arrange
    //TODO: Create paymentDetails object initialized with fake data where amount should be negative or undefined
    const paymentDetails : PaymentDetails ={
      amount: -1,
      currency: 'DT',
      method: PaymentMethod.CreditCard,
      cardNumber: '5520'
    }
    // Act & Assert
    expect(() => paymentService.makePayment(paymentDetails)).toThrow('Invalid payment amount');
  });
});
