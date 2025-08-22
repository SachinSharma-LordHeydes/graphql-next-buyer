import { gql } from "graphql-tag";

export const userTypeDefs = gql`
  enum Role {
    BUYER
    SELLER
    ADMIN
  }

  enum Gender {
    MALE
    FEMALE
    OTHERS
    NOT_TO_SAY
  }

  scalar DateTime

  type User {
    id: ID!
    clerkId: String!
    email: String!
    firstName: String
    lastName: String
    phone: String
    gender: Gender
    dob: DateTime
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!

    addresses: [Address!]
    paymentMethods: [PaymentMethod!]
    cartItems: [CartItem!]
    orders: [Order!]
    reviews: [Review!]
    products: [Product!]
    payouts: [Payout!]
    sellerOrders: [SellerOrder!]
    Wishlist: [Wishlist!]
  }

  input UpdateUserProfileDetailsInput {
    firstName: String
    lastName: String
    phone: String
    gender: Gender
    dob: DateTime
  }

  type Query {
    getUserProfileDetails: User!
  }

  type Mutation {
    updateUserProfileDetails(input: UpdateUserProfileDetailsInput): User!
  }
`;
