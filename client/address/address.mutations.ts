import gql from "graphql-tag";

export const ADD_ADDRESS = gql`
  mutation AddAddress($input: AddAddressInput!) {
    addAddress(input: $input)
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($input: UpdateAddressInput!) {
    updateAddress(input: $input)
  }
`;


export const DELETE_ADDRESS_BY_ID = gql`
  mutation DeleteAddressById($id: ID!) {
    deleteAddressById(id: $id)
  }
`;
