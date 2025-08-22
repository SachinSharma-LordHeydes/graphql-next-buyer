import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart($variantId: String!, $quantity: Int!) {
    addToCart(variantId: $variantId, quantity: $quantity)
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($variantId: ID!) {
    removeFromCart(variantId: $variantId)
  }
`;

export const UPDATE_CART_QUANTITY = gql`
  mutation UpdateCartQuantity($variantId: ID!, $quantity: Int!) {
    updateCartQuantity(variantId: $variantId, quantity: $quantity)
  }
`;

export const CLEAR_CART = gql`
  mutation ClearCart {
    clearCart
  }
`;