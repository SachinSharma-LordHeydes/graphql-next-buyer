import { gql } from '@apollo/client';

export const GET_USER_PAYMENT_METHODS = gql`
  query GetUserPaymentMethods($userId: ID!) {
    getUserPaymentMethods(userId: $userId) {
      id
      type
      provider
      last4
      expiryMonth
      expiryYear
      upiId
      isDefault
      createdAt
    }
  }
`;

export const GET_PAYMENT_STATUS = gql`
  query GetPaymentStatus($paymentId: ID!) {
    getPaymentStatus(paymentId: $paymentId) {
      id
      status
      transactionId
      amount
      currency
      provider
      createdAt
      updatedAt
      order {
        id
        status
        totalAmount
      }
    }
  }
`;

export const GET_ORDER_DETAILS = gql`
  query GetOrderDetails($orderId: ID!) {
    getOrder(orderId: $orderId) {
      id
      userId
      status
      totalAmount
      currency
      paymentStatus
      deliveryStatus
      createdAt
      updatedAt
      orderItems {
        id
        quantity
        price
        productVariant {
          id
          sku
          price
          attributes
          product {
            id
            name
            slug
            images {
              url
              altText
            }
            brand {
              name
            }
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
        currency
        provider
        createdAt
      }
    }
  }
`;

export const GET_SUPPORTED_PAYMENT_PROVIDERS = gql`
  query GetSupportedPaymentProviders {
    getSupportedPaymentProviders {
      type
      providers {
        name
        displayName
        isEnabled
        supportedCountries
        supportedCurrencies
      }
    }
  }
`;
