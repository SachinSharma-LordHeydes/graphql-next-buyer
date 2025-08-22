import { gql } from '@apollo/client';

export const CREATE_PAYMENT_METHOD = gql`
  mutation CreatePaymentMethod($input: PaymentMethodInput!) {
    createPaymentMethod(input: $input) {
      id
      type
      provider
      last4
      upiId
      isDefault
      createdAt
    }
  }
`;

export const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($input: PaymentInput!) {
    processPayment(input: $input) {
      id
      status
      transactionId
      amount
      currency
      provider
      createdAt
      order {
        id
        status
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      userId
      status
      totalAmount
      currency
      paymentStatus
      deliveryStatus
      createdAt
      orderItems {
        id
        quantity
        price
        productVariant {
          id
          product {
            id
            name
          }
        }
      }
      shippingAddress {
        fullName
        streetAddress
        city
        state
        zipCode
        country
        phone
      }
      payment {
        id
        status
        transactionId
        amount
        provider
      }
    }
  }
`;

export const VALIDATE_PAYMENT = gql`
  mutation ValidatePayment($paymentId: ID!, $validationData: JSON!) {
    validatePayment(paymentId: $paymentId, validationData: $validationData) {
      id
      status
      isValidated
      validatedAt
    }
  }
`;
