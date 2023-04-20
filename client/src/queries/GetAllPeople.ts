import { gql } from '@apollo/client';
const GET_PERSONS = gql`
query GetPersons {
  persons {
    id
    name
    age
  }
}
`;
export default GET_PERSONS;