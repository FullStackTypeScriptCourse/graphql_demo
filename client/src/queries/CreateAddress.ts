import { gql } from '@apollo/client';
// Define mutation
const CREATE_ADDRESS = gql`
  # Create a new address
  mutation CreateAddress($street: String!,$city: String!,$country: String!,$zip: String!) {
    createAddress(street: $street, city: $city, country: $country, zip: $zip) {
      id
      street
      city
      country
      zip
    }
  }
`;
export default CREATE_ADDRESS;