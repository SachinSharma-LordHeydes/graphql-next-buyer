import gql from "graphql-tag";

export const ADD_ADDRESS = gql`
  mutation AddAddress {
    addAddress(input: AddAddressInput)
    addAddress(input: UpdateAddressInput)
  }
`;
