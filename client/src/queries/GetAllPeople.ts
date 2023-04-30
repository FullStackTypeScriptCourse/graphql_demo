import { gql } from '@apollo/client';
const GET_PERSONS = gql`
query GetPersons {
  persons {
    id
    name
    age
    address {
      id
      street
      city
      zip
      country
    }
  }
}
`;
export default GET_PERSONS;