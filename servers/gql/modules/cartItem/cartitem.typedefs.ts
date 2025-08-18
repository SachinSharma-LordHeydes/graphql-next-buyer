import { gql } from "graphql-tag";

export const cartItemTypeDefs = gql`
  scalar DateTime

  type CartItem {
    id: ID!
    userId: String!
    variantId: String!
    quantity: Int!
    createdAt: DateTime!
    updatedAt: DateTime!

    user: User!
    variant: ProductVariant!
  }

  type Query {
    getCarts: [CartItem!]!
    getMyCart: [CartItem!]!
  }
  type Mutation {
    addToCart(variantId: String!, quantity: Int!): Boolean!

    updateCartQuantity(cartItemId: ID!, quantity: Int!): Boolean!
    clearCart(cartItemId: ID!, quantity: Int!): Boolean!

    removeFromCart(variantId: ID!): Boolean!
  }
`;
