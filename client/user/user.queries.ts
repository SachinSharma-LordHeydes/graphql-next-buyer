import gql from "graphql-tag";

export const GET_USER_PROFILE_DETAILS = gql`
  query GetUserProfileDetails {
    getUserProfileDetails {
      id
      firstName
      email
      lastName
      phone
      gender
      dob
    }
  }
`;
