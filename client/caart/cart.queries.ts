import { gql } from "@apollo/client";

export const GET_CART_ITEMS = gql`
  query GetCarts {
    getCarts {
      id
      quantity
      createdAt
      updatedAt
      variant {
        id
        price
        product {
          id
          name
          images {
            url
          }
        }
      }
    }
  }
`;

export const GET_MY_CART_ITEMS = gql`
  query GetMyCart {
    getMyCart {
      id
      quantity
      variant {
        id
        product {
          id
        }
      }
    }
  }
`;

// Lightweight query for just checking cart state
export const GET_CART_PRODUCT_IDS = gql`
  query GetCartProductIds {
    getMyCart {
      variant {
        product {
          id
        }
      }
    }
  }
`;
